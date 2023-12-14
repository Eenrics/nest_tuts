// IT IS BEST PRACTICE TO MAKE ALL DTO PROPERTIES AS READONLY TO HELP MAITAIN IMMUTABILITY
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
    // THIS APIPROPERTY DECORATOR ALLOW US TO SET VARIOUS SCHEMA OBJECT PROPERTIES LIKE DEFAULT, DESCRIPTION AND MANY MORE
    @ApiProperty({ description: 'The name of a coffee.' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The brand of a coffee.' })
    @IsString()
    readonly brand: string;

    @ApiProperty({ example: [] })
    @IsString({ each: true })
    readonly flavors: string[];
}
