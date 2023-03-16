import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
