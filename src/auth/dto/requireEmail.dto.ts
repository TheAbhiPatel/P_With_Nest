import { IsEmail, IsNotEmpty } from 'class-validator';

export class requireEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
