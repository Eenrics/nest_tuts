import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key.guard';
import { WrapResponseInterceptor } from './common/interceptor/wrap-response.interceptor';
import { TimeoutInterceptor } from './common/interceptor/timeout.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // HERE WE OURSELF INSTANTIATED THE VALIDATION PIPE. 
  // OPTIONALLY WE CAN LET NEST INSTANTIATE IT FOR US BY LISTING IT IN PROVIDERS ARRAY OF APP.MODULE.TS
  app.useGlobalPipes(new ValidationPipe({
    // ANY PROPERTY NOT INCLUDED IN WHILE LIST WILL BE REMOVED
    whitelist: true,
    // THIS PROPERTY IN COMBINATION WITH WHILE LIST, ENABLES DISFUCTIONALITY
    forbidNonWhitelisted: true,
    // TRIES TO TRANSFORM THE TYPE OF INPUTS FROM REQUEST
    transform: true,
    // WITH THIS WE DONT HAVE TO USE TYPE CLASS TRANFORMER DECORATOR IMPLICITLY IN OUT DTO
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  // WE CAN NOT BIND OUR GUARDS/FILTERS/INTERCEPTORS/PIPES IF THEY HAVE DEPENDENCIES
  app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalInterceptors(new WrapResponseInterceptor(), new TimeoutInterceptor())
  // app.useGlobalGuards(new ApiKeyGuard())
  // MIDDLEWARE IS A FUNCTION THAT IS CALLED BEFORE THE ROUTE HANDLER AND ANY OTHER BUILDING BLOCKS ARE PROCESSED(GUARDS, INTERCEPTORS, PIPES)
  // CLASS MIDDLEWARE IS INJECTABLE AND CAN HAVE DEPENDENCIES, BUT FUNCTION MIDDLEWARE IS NOT INJECTABLE AND IT IS STATELESS

  // THE OPENAPI SPECIFICATION IS A LANGUAGE AGNOSTIC DEFINITION FORMAT USED FOR DESCRIBING REST APIS
  const options = new DocumentBuilder()
    .setTitle('ILuvCoffee')
    .setDescription('Coffee API')
    .setVersion('1.0')
    .addTag('coffee')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
