import { Injectable } from '@nestjs/common';

import { PrismaService } from '@libs/prisma/prisma.service';
import { ICampus } from './entities/campus.entity';
import { CampusMapper } from './mappers/campus.mapper';

@Injectable()
export class CampusService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<ICampus[]> {
    const campus = await this.prisma.campus.findMany({
      where: {
        is_active: true,
      },
    });

    const data = campus ? campus.map((x) => CampusMapper(x)) : [];

    return data;
  }
}
