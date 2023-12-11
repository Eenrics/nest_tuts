import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

// ALL INTERCEPTORS MUST IMPLEMENT THE NESTINTERCEPTOR INTERFACE IMPORTED FROM NESTJS/COMMON
@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  // THIS INTERFACE REQUIRES THAT WE PROVIDE AN INTERCEPT METHOD THAT RECEIVES TWO PARAMETERS: CONTEXT AND NEXT WITHIN OUR CLASS
  // THIS INTERCEPT METHOD MUST RETURN AN OBSERVABLE
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // console.log('Before...');

    // return next.handle().pipe(tap(data => console.log('After...', data)))
    return next.handle().pipe(map(data => ({ data })))
  }
}
