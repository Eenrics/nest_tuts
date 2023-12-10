import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

// ALL EXCEPTION FILTERS SHOULD IMPLEMENT THE EXPETION FILTER INTERFACE IMPORTED FROM NESTJS/COMMON
@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exeptionResponse = exception.getResponse();

    const error =
      typeof response === 'string'
        ? { message: exeptionResponse }
        : (exeptionResponse as Object)

    response.status(status).json({
      ...error,
      timestamp: new Date().toISOString(),
    })
  }
}
