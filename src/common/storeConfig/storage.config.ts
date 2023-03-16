import { diskStorage, StorageEngine } from 'multer';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';

export const storageConfig = (ENV: string): StorageEngine =>
  diskStorage({
    destination: `.${new ConfigService().get(
      'STORAGE_PATH',
    )}${new ConfigService().get(ENV)}`,
    filename: (req, file, callback) => {
      crypto.randomBytes(32, (err, hash) => {
        if (err) {
          callback(err, null);
        }
        const extArray: string[] = file.mimetype.split('/');
        const extension: string = extArray[extArray.length - 1];
        const fileName = `${hash.toString('hex')}.${extension}`;
        callback(null, fileName);
      });
    },
  });
