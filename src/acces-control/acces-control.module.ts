import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';

@Module({ providers: [ PrismaService ] })
export class AccesControlModule {}
