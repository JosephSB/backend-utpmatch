import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import config from '@config/index';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: config.JWT.SEED,
      signOptions: { expiresIn: config.JWT.TOKEN_DUR },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService],
})
export class AuthModule {}
