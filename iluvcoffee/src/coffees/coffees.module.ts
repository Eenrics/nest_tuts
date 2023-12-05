import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constant';


class MockCoffeeService {
    findAll() {
        return 'mock-coffees';
    }
}
@Module({
    imports: [
        // MAKE TYPEORM MODULE AWARE OF THE ENTITIES
        TypeOrmModule.forFeature([Coffee, Flavor, Event])
    ],
    controllers: [CoffeesController],
    providers: [CoffeesController, { provide: CoffeesService, useValue: new MockCoffeeService }, { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] }],
    exports: [CoffeesService]
})
export class CoffeesModule { }
