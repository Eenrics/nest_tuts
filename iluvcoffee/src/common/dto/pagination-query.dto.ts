// import { Type } from "class-transformer"
import { IsOptional, IsPositive } from "class-validator"

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    // @Type(() => Number)
    limit: number

    // @Type(() => Number)
    // WE DONT NEED TYPE CLASS TRANSFORMER DECORATOR BECAUSE WE ENABLED enableImplicitConversion AT MAIN.TS FILE
    @IsPositive()
    @IsOptional()
    offset: number
}
