import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @MaxLength(15, { message: 'Max length is 15 characters.' })
  title: string;

  @IsNotEmpty()
  description: string;
}
