/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from 'src/DTO/create.movie.dto';
import { MovieEntity, MovieStatus } from 'src/Entity/movie.entity';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MemoviesService {
  constructor(
    @InjectRepository(MovieEntity) private repo: Repository<MovieEntity>,
  ) {}

  async getAllMovies(user: UserEntity) {
    const query = await this.repo.createQueryBuilder('movie');
    query.where(`movie.userId = :userId`, { userId: user.id });

    try {
      return await query.getMany();
    } catch (err) {
      throw new InternalServerErrorException('No movie found');
    }
  }

  async create(createMovieDTO: CreateMovieDto, user: UserEntity) {
    const { title, description } = createMovieDTO;
    const movie = new MovieEntity();
    movie.title = title;
    movie.description = description;
    movie.status = MovieStatus.TO_WATCH;
    movie.userId = user.id;

    this.repo.create(movie);
    return await this.repo.save(movie);
  }

  async update(id: number, status: MovieStatus, user: UserEntity) {
    try {
      await this.repo.update({ id, userId: user.id }, { status });
      return this.repo.findOneBy({ id });
    } catch (err) {
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async delete(id: number, user: UserEntity) {
    const result = await this.repo.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException('Movie not deleted');
    } else {
      return { success: true };
    }
  }
}
