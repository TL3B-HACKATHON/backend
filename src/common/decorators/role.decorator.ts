import { SetMetadata } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

export const Roles = (...roles: string[]) => {
  const hashedRoles: Promise<string[]> = Promise.all(
    roles.map((role) => bcrypt.hash(role, 10)),
  );
  return SetMetadata(new ConfigService().get('ROLES_KEY'), hashedRoles);
};
