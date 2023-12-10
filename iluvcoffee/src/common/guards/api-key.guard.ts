import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // REFLECTOR CLASS ALLOWS US TO RETRIEVE METADATA WITHIN SPECIFIC CONTEXT
  constructor(private readonly reflector: Reflector, private readonly configService: ConfigService) { }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // REFLECTOR REQUERES A TRAGET OBJECT CONTEXT FOR A SECOND PARAMETER, IN THIS CASE WE WANT TO TARGET THE METHOD HANDLER (context.getHander()). IF WE WANT TO RETRIEVE METADATA FROM CLASS LEVEL, WE DO (context.getClass())
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler())
    if (isPublic) {
      return true
    }
    const request = context.switchToHttp().getRequest<Request>()
    const authHeader = request.header('Authorization')
    return authHeader === this.configService.get('API_KEY');
  }
}
