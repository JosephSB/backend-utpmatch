import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { SongsService } from './songs.service';
import { SongsController } from './songs.controller';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [SongsController],
  providers: [SongsService, PrismaService],
})
export class SongsModule {}
