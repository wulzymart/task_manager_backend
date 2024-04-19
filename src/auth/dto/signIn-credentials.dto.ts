import { IsString, MaxLength, MinLength } from 'class-validator';

export class SignInCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;
  @IsString()
  password: string;
}
