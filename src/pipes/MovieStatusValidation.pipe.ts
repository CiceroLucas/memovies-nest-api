/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { MovieStatus } from 'src/Entity/movie.entity';

export class MovieStatusValidationPipe implements PipeTransform {
  readonly allowedStatus = [MovieStatus.TO_WATCH, MovieStatus.WATCHED];

  transform(value: any, metadata: ArgumentMetadata): any {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status.`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatus.indexOf(status);

    return index !== -1;
  }
}
