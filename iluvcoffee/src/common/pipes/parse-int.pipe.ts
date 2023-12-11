import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
// ALL PIPES SHOULD IMPLEMENT THE PIPE TRANSFORM INTERFACE IMPORTED FROM NESTJS/COMMON
export class ParseIntPipe implements PipeTransform {
  // THIS INTERFACE REQUIRES THAT WE PROVIDE A TRANSFORM METHOD THAT RECEIVES TWO PARAMETERS: VALUE AND METADATA WITHIN OUR CLASS
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(`Validation failed! ${value} is not an integer!`);
    }
    return val;
  }
}
