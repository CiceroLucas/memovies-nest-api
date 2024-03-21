import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => MovieEntity, (movie: MovieEntity) => movie.user)
  movies: MovieEntity[];
}
