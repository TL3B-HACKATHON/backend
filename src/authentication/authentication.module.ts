import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { PrismaService } from 'src/database/PrismaService';
import { UsersService } from 'src/users/users.service';
import { AtStrategy, RtStrategy } from './strategies';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [JwtModule.register({}), HttpModule],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    PrismaService,
    UsersService,
    AtStrategy,
    RtStrategy,
    JwtService,
  ],
})
export class AuthenticationModule {}
