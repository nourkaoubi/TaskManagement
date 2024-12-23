import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.authService.register(email, password);
    return { message: 'User registered successfully', user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const token = await this.authService.login(email, password);
    return { message: 'Login successful', email, ...token };
  }
}
