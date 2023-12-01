import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    imports: [
        // MAKE TYPEORM MODULE AWARE OF THE ENTITIES
        TypeOrmModule.forFeature([Coffee, Flavor])
    ],
    controllers: [CoffeesController],
    providers: [CoffeesController, CoffeesService],
})
export class CoffeesModule { }
