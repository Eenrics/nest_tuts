import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi'
import appConfig from './config/app.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.environment', '.env'],
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432)
      }),
      load: [appConfig]
    }),
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      // AN ENTITY REPRESENTS A RELATIONSHIP BETWEEN A DATABASE TABLE AND A TYPESCRIPT CLASS
      // IN NESTJS AN ENTITY IS A CLASS DECORATED WITH @ENTITY() DECORATOR
      autoLoadEntities: true,
      // MAKE SURE TO DISABLE SYNCHRONIZE IN PRODUCTION
      // AUTOMATICALLY SYNCHRONIZES ENTITIES AND METADATA WITH DATABASE SCHEMA / TABLES
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
