import { Injectable } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
    constructor(private readonly coffeesService: CoffeesService) { }

    findAll() {
        return this.coffeesService.findAll();
    }
}
