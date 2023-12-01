// IT IS BEST PRACTICE TO MAKE ALL DTO PROPERTIES AS READONLY TO HELP MAITAIN IMMUTABILITY
import { IsString } from 'class-validator';

export class CreateCoffeeDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString({ each: true })
    readonly flavors: string[];
}
