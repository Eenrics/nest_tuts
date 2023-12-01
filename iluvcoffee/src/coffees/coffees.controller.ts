import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }

    @Get()
    findAll() {
        return 'This action returns all coffees';
    }

    // AS A BEST PRACTICE, USE PATH PARAMETERS FOR RESOURCE AND QUERY PARAMETERS TO FILTER OR SORT THAT RESOURCE
    @Get('pagination')
    paginate(@Query() paginationQuery) {
        const { limit, offset } = paginationQuery;
        return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    }

    @Get('express-res')
    expressRes(@Res() response) {
        response.status(200).send('response using express res');
    }

    @Get('service')
    service() {
        return this.coffeesService.findAll();
    }

    @Get('service/:id')
    serviceOne(@Param('id') id: number) {
        // TRANSFORM SET TO TRUE AT MAIN.TS TRIES TO TRANSFORM THIS TO NUMBER. THIS MIGHT HAVE PERFORMANCE IMPACT
        console.log(typeof id)
        return this.coffeesService.findOne('' + id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns one coffee ${id}`;
    }

    @Post()
    create(@Body('name') name: string) {
        return name;
    }

    // STATIC STATUS CODE
    @Post('gone')
    @HttpCode(HttpStatus.GONE)
    gone() {
        return 'This response is gone';
    }

    @Post('service')
    createService(@Body() createCoffeeDto: CreateCoffeeDto) {
        // FALSE IF TRANSFORM IS NOT SET TO TRUE IN MAIN.JS FILE. BUT THIS MIGHT IMPACT PERFORMACE
        console.log(createCoffeeDto instanceof CreateCoffeeDto)
        return this.coffeesService.create(createCoffeeDto);
    }

    // PATCH UPDATES PARTIAL RESOURCE
    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action updates #${id} coffee with values ${JSON.stringify(body)}`;
    }

    @Patch('service/:id')
    updateService(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
        return this.coffeesService.update(id, updateCoffeDto);
    }

    // PUT UPDATES ENTIRE RESOURCE
    @Put(':id')
    replace(@Param('id') id: string, @Body() body) {
        return `This action replaces #${id} coffee with values ${JSON.stringify(body)}`;
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return `This action removes #${id} coffee`;
    }
}
