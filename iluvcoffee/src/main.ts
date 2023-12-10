import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

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
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
