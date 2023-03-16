import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

import { AtGaurd, RolesGuard } from './common/guards';

import { PrismaService } from './database/PrismaService';
import { UsersService } from './users/users.service';

import { UsersModule } from './users/users.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
    }),
    UsersModule,
    AuthenticationModule,
  ],
  controllers: [],
  providers: [
    UsersService,
    PrismaService,
    { provide: APP_GUARD, useClass: AtGaurd },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AppModule {}
