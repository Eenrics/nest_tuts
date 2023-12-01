import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // ANY PROPERTY NOT INCLUDED IN WHILE LIST WILL BE REMOVED
    whitelist: true
  }))
  await app.listen(3000);
}
bootstrap();
