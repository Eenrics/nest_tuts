import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "./create-coffee.dto";
// DTOs ARE USEFUL FOR DATA COMING IN AND GOING OUT
// export class UpdateCoffeeDto {
//     readonly name?: string;
//     readonly brand?: string;
//     readonly flavors?: string[];
// }

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) { }