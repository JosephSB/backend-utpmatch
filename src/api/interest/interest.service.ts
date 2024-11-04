import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma/prisma.service';
import { IInterest } from './entities/interest.entity';
import { InterestMapper } from './mappers/interest.mapper';

@Injectable()
export class InterestService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IInterest[]> {
    const interests = await this.prisma.interests.findMany({
      where: {
        is_active: true,
      },
    });

    const data = interests ? interests.map((x) => InterestMapper(x)) : [];

    return data;
  }
}
