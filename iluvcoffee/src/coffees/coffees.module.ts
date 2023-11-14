import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';

@Module({
    imports: [],
    controllers: [CoffeesController],
    providers: [CoffeesController],
})
export class CoffeesModule { }
