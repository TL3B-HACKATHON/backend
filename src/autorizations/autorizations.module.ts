import { Module } from '@nestjs/common';
import { AutorizationsService } from './autorizations.service';
import { AutorizationsController } from './autorizations.controller';
import { PrismaService } from 'src/database/PrismaService';

@Module({
  controllers: [AutorizationsController],
  providers: [AutorizationsService, PrismaService],
})
export class AutorizationsModule {}
