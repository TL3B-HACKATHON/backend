import {
  HttpException,
  HttpStatus,
  NotFoundException,
  ServiceUnavailableException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createReadStream, existsSync } from 'fs';

export const readFile = (path: string) => {
  const fullPath = `.${new ConfigService().get('STORAGE_PATH')}${path}`;
  if (existsSync(fullPath)) {
    return createReadStream(fullPath);
  }
  throw new NotFoundException('File Not Found');
};
