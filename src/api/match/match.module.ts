import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  controllers: [MatchController],
  providers: [MatchService, PrismaService],
})
export class MatchModule {}
