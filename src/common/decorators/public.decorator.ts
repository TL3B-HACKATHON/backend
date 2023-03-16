import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const Public = () =>
  SetMetadata(new ConfigService().get('PUBLIC_KEY'), true);
