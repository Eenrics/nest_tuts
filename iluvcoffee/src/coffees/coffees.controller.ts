import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse } from '@nestjs/swagger';

// HERE WE ARE USING VALIDATION PIPE AT CONTROLLER LEVEL
// @UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService) { }

    // HERE WE ARE USING VALIDATION PIPE AT METHOD / ROUTE LEVEL
    // @UsePipes(ValidationPipe)
    // TO SPECIFY OTHER EXAMPLE RESPONSES
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    // SETTING CUSTOM DECORATOR FOR PUBLIC ROUTES
    @Public()
    @Get()
    async findAll(@Protocol('https') protocol: string) {
        console.log({ protocol })
        await new Promise(resolve => setTimeout(resolve, 5000))
        return 'This action returns all coffees';
    }

    // AS A BEST PRACTICE, USE PATH PARAMETERS FOR RESOURCE AND QUERY PARAMETERS TO FILTER OR SORT THAT RESOURCE
    @Get('pagination')
    paginate(
        // HERE WE ARE USING VALIDATION PIPE AT PARAMETER LEVEL / WILL WORK ONLY FOR PAGINATIONQUERYDTO
        // @Query(ValidationPipe) paginationQuery
        @Query() paginationQuery
    ) {
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

    @Get('service/pagination')
    servicePagination(@Query() paginationQuery: PaginationQueryDto) {
        // const {limit, }
        return this.coffeesService.findAllPaginated(paginationQuery);
    }

    @Get('service/:id')
    serviceOne(@Param('id') id: number) {
        // TRANSFORM SET TO TRUE AT MAIN.TS TRIES TO TRANSFORM THIS TO NUMBER. THIS MIGHT HAVE SLIGHT PERFORMANCE IMPACT
        console.log(typeof id)
        // return this.coffeesService.findOne('' + id);
        return this.coffeesService.findOne(id);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: string) {
        console.log({ id })
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
