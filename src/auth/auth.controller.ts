import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/register.user.dto';
import { LoginUserDto } from 'src/DTO/login.user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registreation(@Body(ValidationPipe) regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }

  @Post('login')
  signin(@Body(ValidationPipe) logDTO: LoginUserDto) {
    return this.authService.loginUser(logDTO);
  }
}
