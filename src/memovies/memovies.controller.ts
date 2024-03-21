import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MemoviesService } from './memovies.service';
import { CreateMovieDto } from 'src/DTO/create.movie.dto';
import { MovieStatusValidationPipe } from 'src/pipes/MovieStatusValidation.pipe';
import { MovieStatus } from 'src/Entity/movie.entity';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/Entity/user.entity';
import { User } from 'src/auth/user.decorator';

@Controller('memovies')
@UseGuards(AuthGuard())
export class MemoviesController {
  constructor(private moviesService: MemoviesService) {}

  @Get()
  getAllMovies(@User() user: UserEntity) {
    return this.moviesService.getAllMovies(user);
  }

  @Post()
  createNewMovie(
    @Body(ValidationPipe) data: CreateMovieDto,
    @User() user: UserEntity,
  ) {
    return this.moviesService.create(data, user);
  }

  @Patch(':id')
  updateMovie(
    @Body('status', MovieStatusValidationPipe) status: MovieStatus,
    @Param('id') id: number,
    @User() user: UserEntity,
  ) {
    return this.moviesService.update(id, status, user);
  }

  @Delete(':id')
  deleteMovie(@Param('id') id: number, @User() user: UserEntity) {
    return this.moviesService.delete(id, user);
  }
}
