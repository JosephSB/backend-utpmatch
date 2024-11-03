import {
  Controller,
  Get,
  Post,
  Body,
  VERSION_NEUTRAL,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Public } from '@api/shared/decorators/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';
import { IUserPayloadToken } from './entities/auth.entity';
import { UserRequest } from '@api/shared/decorators/user-token.decorator';

@Controller({
  path: 'api/auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('/login')
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto);
  }

  @Public()
  @HttpCode(200)
  @Post('/register')
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto);
  }

  @Get('/me')
  me(@UserRequest() userRequest: IUserPayloadToken) {
    return this.authService.findByUserID(userRequest.user_id);
  }
}
