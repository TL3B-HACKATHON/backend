import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private config: ConfigService,
    @Inject(UsersService) private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles: string[] = await this.reflector.getAllAndOverride<string[]>(
      this.config.get('ROLES_KEY'),
      [context.getHandler(), context.getClass()],
    );

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const id = request.user.sub;
    const user = await this.userService.findOne(id);
    console.log('user', user);
    const booledRoles = await Promise.all(
      roles.map((role) => bcrypt.compare(user.role, role)),
    );
    const isPermeted: boolean = booledRoles.includes(true);

    if (!isPermeted) {
      throw new ForbiddenException(
        "You don't have permissions to access this ressource",
      );
    }
    return true;
  }
}
