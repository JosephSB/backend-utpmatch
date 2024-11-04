import { Module } from '@nestjs/common';
import { IntentionsService } from './intentions.service';
import { IntentionsController } from './intentions.controller';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  controllers: [IntentionsController],
  providers: [IntentionsService, PrismaService],
})
export class IntentionsModule {}
