import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: MovieStatus;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.movies)
  user: UserEntity;

  @Column()
  userId: number;
}

export enum MovieStatus {
  TO_WATCH = 'TO WATCH',
  WATCHED = 'WATCHED',
}
