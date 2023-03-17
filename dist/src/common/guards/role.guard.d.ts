import { CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
export declare class RolesGuard implements CanActivate {
    private reflector;
    private config;
    private readonly userService;
    constructor(reflector: Reflector, config: ConfigService, userService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
