import { Module } from '@nestjs/common';
import { MemoviesController } from './memovies.controller';
import { MemoviesService } from './memovies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from 'src/Entity/movie.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity]), AuthModule],
  controllers: [MemoviesController],
  providers: [MemoviesService],
})
export class MemoviesModule {}
