import { BadRequestException, GoneException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

export const removeFile = async (path: string) => {
  if (!path) throw new BadRequestException('File Path Not Provided');
  try {
    await fs.unlinkSync(`.${new ConfigService().get('STORAGE_PATH')}${path}`);
    return { message: 'File Successfully Deleted' };
  } catch (error) {
    if (error.code != 'ENOENT')
      throw new GoneException('File Could Not Be Deleted');
  }
};
