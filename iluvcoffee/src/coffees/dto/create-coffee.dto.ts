// IT IS BEST PRACTICE TO MAKE ALL DTO PROPERTIES AS READONLY TO HELP MAITAIN IMMUTABILITY
export class CreateCoffeeDto {
    readonly name: string;
    readonly brand: string;
    readonly flavors: string[];
}
