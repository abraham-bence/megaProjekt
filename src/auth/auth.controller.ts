import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
  authService: AuthService
      constructor(authService : AuthService) {
        this.authService = authService;
      }

  @Post('login')
  async login(@Body() loginData: LoginDto) {
    try {
      return await this.authService.login(loginData);
    } catch {
      throw new UnauthorizedException("Hibás email vagy jelszó");
    }
  }
}
