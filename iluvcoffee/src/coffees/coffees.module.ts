import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';

@Module({
    imports: [
        // MAKE TYPEORM MODULE AWARE OF THE ENTITIES
        TypeOrmModule.forFeature([Coffee])
    ],
    controllers: [CoffeesController],
    providers: [CoffeesController, CoffeesService],
})
export class CoffeesModule { }
