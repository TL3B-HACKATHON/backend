import { ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGaurd extends AuthGuard('jwt') {
  constructor(private reflector: Reflector, private config: ConfigService) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride(
      this.config.get('PUBLIC_KEY'),
      [context.getHandler(), context.getClass()],
    );
    if (isPublic) return true;
    return super.canActivate(context);
  }
}
