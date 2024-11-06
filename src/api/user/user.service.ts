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
                interest: {
                  select: {
                    interest_id: true,
                    name: true,
                    is_active: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }
}
