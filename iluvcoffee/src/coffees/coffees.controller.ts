import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { COFFEE_BRANDS } from './coffees.constant';
import { REQUEST } from '@nestjs/core';
// import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(
        private readonly coffeesService: CoffeesService,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[],
        // THIS MIGHT HURT PERFORMANCE
        @Inject(REQUEST) private readonly request: Request,
    ) {
        console.log(coffeeBrands);
    }

    // @Get()
    // findAll() {
    //     return 'This action returns all coffees';
    // }

    // // AS A BEST PRACTICE, USE PATH PARAMETERS FOR RESOURCE AND QUERY PARAMETERS TO FILTER OR SORT THAT RESOURCE
    // @Get('pagination')
    // paginate(@Query() paginationQuery) {
    //     const { limit, offset } = paginationQuery;
    //     return `This action returns all coffees. Limit: ${limit}, offset: ${offset}`;
    // }

    // @Get('express-res')
    // expressRes(@Res() response) {
    //     response.status(200).send('response using express res');
    // }

    // @Get('service')
    // service() {
    //     return this.coffeesService.findAll();
    // }

    // @Get('service/pagination')
    // servicePagination(@Query() paginationQuery: PaginationQueryDto) {
    //     // const {limit, }
    //     return this.coffeesService.findAllPaginated(paginationQuery);
    // }

    // @Get('service/:id')
    // serviceOne(@Param('id') id: number) {
    //     // TRANSFORM SET TO TRUE AT MAIN.TS TRIES TO TRANSFORM THIS TO NUMBER. THIS MIGHT HAVE SLIGHT PERFORMANCE IMPACT
    //     console.log(typeof id)
    //     // return this.coffeesService.findOne('' + id);
    //     return this.coffeesService.findOne(id);
    // }

    @Get('mock')
    mockServiceOne() {
        return this.coffeesService.findAll();
    }

    // @Get(':id')
    // findOne(@Param('id') id: string) {
    //     return `This action returns one coffee ${id}`;
    // }

    // @Post()
    // create(@Body('name') name: string) {
    //     return name;
    // }

    // // STATIC STATUS CODE
    // @Post('gone')
    // @HttpCode(HttpStatus.GONE)
    // gone() {
    //     return 'This response is gone';
    // }

    // @Post('service')
    // createService(@Body() createCoffeeDto: CreateCoffeeDto) {
    //     // FALSE IF TRANSFORM IS NOT SET TO TRUE IN MAIN.JS FILE. BUT THIS MIGHT IMPACT PERFORMACE
    //     console.log(createCoffeeDto instanceof CreateCoffeeDto)
    //     return this.coffeesService.create(createCoffeeDto);
    // }

    // // PATCH UPDATES PARTIAL RESOURCE
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() body) {
    //     return `This action updates #${id} coffee with values ${JSON.stringify(body)}`;
    // }

    // @Patch('service/:id')
    // updateService(@Param('id') id: string, @Body() updateCoffeDto: UpdateCoffeeDto) {
    //     return this.coffeesService.update(id, updateCoffeDto);
    // }

    // // PUT UPDATES ENTIRE RESOURCE
    // @Put(':id')
    // replace(@Param('id') id: string, @Body() body) {
    //     return `This action replaces #${id} coffee with values ${JSON.stringify(body)}`;
    // }

    // @Delete(':id')
    // remove(@Param('id') id: string) {
    //     return `This action removes #${id} coffee`;
    // }
}
