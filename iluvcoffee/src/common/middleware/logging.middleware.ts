import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
// ALL MIDDLEWARE SHOULD IMPLEMENT NestMiddleware INTERFACE IMPORTED FROM NESTJS/COMMON
export class LoggingMiddleware implements NestMiddleware {
  // THIS INTERFACE REQUIRES THAT WE PROVIDE A USE METHOD THAT RECEIVES THREE PARAMETERS: REQ, RES, AND NEXT WITHIN OUR CLASS
  use(req: any, res: any, next: () => void) {
    // REMEMBER TO ALWAYS CALL NEXT() AT THE END OF YOUR MIDDLEWARE, OTHERWISE THE REQUEST WILL HANG
    console.log('Hi from middleware!...');
    console.time('Request-response time')
    res.on('finish', () => {
      console.log('Bye from middleware!...')
      console.timeEnd('Request-response time')
    });
    next();
  }
}
