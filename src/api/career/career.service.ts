import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma/prisma.service';
import { ICareer } from './entities/career.entity';
import { CareerMapper } from './mappers/career.mapper';

@Injectable()
export class CareerService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ICareer[]> {
    const careers = await this.prisma.career.findMany({
      where: {
        is_active: true,
      },
    });

    const data = careers ? careers.map((x) => CareerMapper(x)) : [];

    return data;
  }
}
