import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [{
        id: 1,
        name: 'Shipwreck Roast',
        brand: 'Buddy Brew',
        flavors: ['chocolate', 'vanilla']
    }]

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            // HTTP EXCEPTIONS TAKES TWO PARAMETERS, MESSAGE AND STATUS CODE
            // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        return coffee;
    }

    create(createCoffeeDto: CreateCoffeeDto) {
        this.coffees.push({ ...createCoffeeDto, id: this.coffees.length + 1 });
        return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const existingCoffee = this.findOne(id);
        if (!existingCoffee) {
            throw new NotFoundException(`Coffee #${id} not found`);
        }
        this.coffees = this.coffees.map(item => {
            if (item.id === +id) {
                Object.assign(item, updateCoffeeDto);
            }
            return item;
        })
    }

}
