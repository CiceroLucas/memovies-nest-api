import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/register.user.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from 'src/DTO/login.user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
    private jwt: JwtService,
  ) {}

  async registerUser(registerDTO: RegisterUserDto) {
    const { username, password } = registerDTO;
    const hashed = await bcrypt.hash(password, 12);

    const user = new UserEntity();
    user.username = username;
    user.password = hashed;
    this.repo.create(user);

    try {
      return await this.repo.save(user);
    } catch (err) {
      throw new InternalServerErrorException(
        'Something went wrong, user was not created.',
      );
    }
  }

  async loginUser(loginUserDTO: LoginUserDto) {
    const { username, password } = loginUserDTO;

    const user = await this.repo.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('invalid credentials');
    }

    const isPassworldMatch = await bcrypt.compare(password, user.password);

    if (isPassworldMatch) {
      const jwtPayload = { username };
      const jwtToken = await this.jwt.signAsync(jwtPayload, {
        expiresIn: '1d',
        algorithm: 'HS512',
      });

      return { token: jwtToken };
    } else {
      throw new UnauthorizedException('invalid crendentials.');
    }
  }
}
