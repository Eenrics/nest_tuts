import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
    @Get()
    findAll() {
        return 'This action returns all coffees';
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return `This action returns one coffee ${id}`;
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

    // PATCH UPDATES PARTIAL RESOURCE
    @Patch(':id')
    update(@Param('id') id: string, @Body() body) {
        return `This action updates #${id} coffee with values ${JSON.stringify(body)}`;
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
