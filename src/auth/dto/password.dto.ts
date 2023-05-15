import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class PasswordDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;
}
