import { Role } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  firstname: string;
  @IsString()
  lastname: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  password?: string | null;
  secret?: string | null;
}
