import { PrismaService } from '@libs/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ListParamsDto } from './dto/list-params.dto';
import {
  MatchMapper,
  NewMatchMapper,
  UserMatchMapper,
} from './mappers/match.mappers';

@Injectable()
export class MatchService {
  constructor(private prisma: PrismaService) {}

  async createRequest(transmitter_id: string, receiver_id: string) {
    const new_match_pending = await this.prisma.match.create({
      data: {
        transmitter_id,
        receiver_id,
        status_id: 1,
      },
      include: {
        matchStatus: true,
      },
    });

    return {
      message: 'ok',
      data: NewMatchMapper(new_match_pending),
    };
  }

  async handleRequest(
    receiver_id: string,
    match_id: string,
    status: 'accept' | 'decline',
  ) {
    const new_match_pending = await this.prisma.match.update({
      where: {
        match_id,
        receiver_id,
        is_active: true,
      },
      data: {
        status_id: status === 'accept' ? 2 : 3,
      },
      include: {
        matchStatus: true,
      },
    });

    return {
      message: 'ok',
      data: NewMatchMapper(new_match_pending),
    };
  }

  async list(
    listParamsDto: ListParamsDto,
    user_id: string,
    status: 'accept' | 'pending',
  ) {
    const matchs = await this.prisma.match.findMany({
      where: {
        OR: [
          status === 'accept'
            ? {
                transmitter_id: user_id,
              }
            : {},
          {
            receiver_id: user_id,
          },
        ],
        status_id: status === 'accept' ? 2 : 1,
        is_active: true,
      },
      skip: (listParamsDto.page - 1) * (listParamsDto.size ?? 10),
      take: listParamsDto.size ?? 10,
      include: {
        transmitter: {
          select: {
            userDetail: true,
          },
        },
        receiver: {
          select: {
            userDetail: true,
          },
        },
      },
    });

    return {
      page: listParamsDto.page,
      limit: listParamsDto.size ?? 10,
      message: 'ok',
      data: matchs.map((x) => MatchMapper(x)),
    };
  }

  async recommendations(listParamsDto: ListParamsDto, user_id: string) {
    const matchs = await this.prisma.users.findMany({
      where: {
        is_active: true,
        user_id: {
          not: user_id,
        },
        NOT: {
          transmitter: {
            some: {
              matchStatus: {
                match_status_id: 1,
              },
            },
          },
          receiver: {
            some: {
              matchStatus: {
                match_status_id: 1,
              },
            },
          },
        },
      },
      skip: (listParamsDto.page - 1) * (listParamsDto.size ?? 10),
      take: listParamsDto.size ?? 10,
      include: {
        interests: {
          select: {
            interest: true,
          },
        },
        favoriteSong: true,
        photos: true,
        userDetail: {
          select: {
            name: true,
            lastname: true,
            description: true,
            birthdate: true,
            contact_phone: true,
            updatedAt: true,
            createdAt: true,
            career: true,
            campus: true,
            intention: true,
          },
        },
      },
    });

    return {
      page: listParamsDto.page,
      limit: listParamsDto.size ?? 10,
      message: 'ok',
      data: matchs.map((x) => UserMatchMapper(x)),
    };
  }
}
