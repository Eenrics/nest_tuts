import { Module } from '@nestjs/common';
import { CoffeeRatingService } from './coffee-rating.service';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingController } from './coffee-rating.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    CoffeesModule,
    DatabaseModule.register({
      type: 'postgres',
      host: 'localhost',
      password: 'pass123',
      port: 5432
    })
  ],
  providers: [CoffeeRatingService],
  controllers: [CoffeeRatingController]
})
export class CoffeeRatingModule { }
