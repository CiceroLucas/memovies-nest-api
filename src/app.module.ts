import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemoviesModule } from './memovies/memovies.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'clf654123',
  database: 'memovies',
  autoLoadEntities: true,
  synchronize: true,
};

@Module({
  imports: [MemoviesModule, TypeOrmModule.forRoot(ormOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
