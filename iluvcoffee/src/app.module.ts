import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
@Module({
  imports: [CoffeesModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'pass123',
    database: 'postgres',
    // AN ENTITY REPRESENTS A RELATIONSHIP BETWEEN A DATABASE TABLE AND A TYPESCRIPT CLASS
    // IN NESTJS AN ENTITY IS A CLASS DECORATED WITH @ENTITY() DECORATOR
    autoLoadEntities: true,
    // MAKE SURE TO DISABLE SYNCHRONIZE IN PRODUCTION
    // AUTOMATICALLY SYNCHRONIZES ENTITIES AND METADATA WITH DATABASE SCHEMA / TABLES
    synchronize: true,
  }), CoffeeRatingModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
