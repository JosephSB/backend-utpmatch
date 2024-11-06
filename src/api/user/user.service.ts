import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@libs/prisma/prisma.service';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';
import { UserMapper } from './mappers/user.mapper';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto, userRequest: IUserPayloadToken) {
    await this.prisma.userInterest.createMany({
      data: createUserDto.interests.map((x) => ({
        user_id: userRequest.user_id,
        interest_id: x,
      })),
    });

    const new_user_detail = await this.prisma.userDetail.create({
      data: {
        user_id: userRequest.user_id,
        name: createUserDto.name,
        lastname: createUserDto.lastname,
        description: createUserDto.description,
        birthdate: new Date(createUserDto.birthdate),
        contact_phone: createUserDto.contact_phone,
        career_id: createUserDto.career_id,
        campus_id: createUserDto.campus_id,
        intention_id: createUserDto.intention_id,
      },
      include: {
        career: true,
        campus: true,
        intention: true,
        user: {
          select: {
            email: true,
            user_id: true,
            interests: {
              select: {
                interest: true,
              },
            },
            favoriteSong: true,
            photos: true,
          },
        },
      },
    });

    const mapper = UserMapper(new_user_detail);

    return {
      message: 'ok',
      data: mapper,
    };
  }

  async findOne(user_id: string) {
    const user = await this.prisma.userDetail.findFirst({
      where: {
        user_id,
        user: {
          is_active: true,
        },
      },
      include: {
        career: true,
        campus: true,
        intention: true,
        user: {
          select: {
            email: true,
            user_id: true,
            interests: {
              select: {
                interest: true,
              },
            },
            favoriteSong: true,
            photos: true,
          },
        },
      },
    });

    return {
      message: 'ok',
      data: user ? UserMapper(user) : null,
    };
  }

  async update(user_id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.interests) {
      await this.prisma.userInterest.deleteMany({
        where: {
          user_id,
        },
      });
      await this.prisma.userInterest.createMany({
        data: updateUserDto.interests.map((x) => ({
          user_id,
          interest_id: x,
        })),
      });
    }

    const update_user_detail = await this.prisma.userDetail.update({
      where: {
        user_id,
      },
      data: {
        name: updateUserDto.name,
        lastname: updateUserDto.lastname,
        description: updateUserDto.description,
        birthdate: updateUserDto.birthdate
          ? new Date(updateUserDto.birthdate)
          : undefined,
        contact_phone: updateUserDto.contact_phone,
        career_id: updateUserDto.career_id,
        campus_id: updateUserDto.campus_id,
        intention_id: updateUserDto.intention_id,
      },
      include: {
        career: true,
        campus: true,
        intention: true,
        user: {
          select: {
            email: true,
            user_id: true,
            interests: {
              select: {
                interest: true,
              },
            },
            favoriteSong: true,
            photos: true,
          },
        },
      },
    });

    const mapper = UserMapper(update_user_detail);

    return {
      message: 'ok',
      data: mapper,
    };
  }
}
