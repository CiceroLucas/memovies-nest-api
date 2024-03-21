import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak, choose a stronger password.',
  })
  password: string;
}
