import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { PrismaService } from '@libs/prisma/prisma.service';
import { IUserPayloadToken } from './entities/auth.entity';
import { AuthMapper } from './mappers/auth.mapper';
import { BcryptService } from '@libs/bycript/bycript.lib';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerAuthDto: RegisterAuthDto) {
    const new_user = await this.prisma.users.create({
      data: {
        email: registerAuthDto.email,
        password: BcryptService.hash(registerAuthDto.password),
        terms_conditions: registerAuthDto.terms_conditions,
      },
    });

    const user = AuthMapper(new_user);

    const payload: IUserPayloadToken = {
      user_id: user.user_id,
      email: user.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'ok',
      token,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const user = await this.prisma.users.findFirst({
      where: { email: loginAuthDto.email, is_active: true },
    });

    if (!user) throw new BadRequestException('Invalid credentials');

    if (
      user.password &&
      !BcryptService.compare(loginAuthDto.password, user.password)
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IUserPayloadToken = {
      user_id: user.user_id,
      email: loginAuthDto.email,
    };

    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'ok',
      data: {
        user_id: user.user_id,
      },
      token,
    };
  }

  async findByUserID(user_id: string) {
    const user = await this.prisma.users.findFirst({
      where: { user_id, is_active: true },
    });

    return {
      message: 'ok',
      data: {
        ...user,
        password: null,
      },
    };
  }
}
