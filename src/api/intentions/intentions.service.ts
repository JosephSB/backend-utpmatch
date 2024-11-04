import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma/prisma.service';
import { IIntention } from './entities/intention.entity';
import { IntentionMapper } from './mappers/intentions.mapper';

@Injectable()
export class IntentionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IIntention[]> {
    const intentions = await this.prisma.intention.findMany({
      where: {
        is_active: true,
      },
    });

    const data = intentions ? intentions.map((x) => IntentionMapper(x)) : [];

    return data;
  }
}
