import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { SearchSongsDto } from './dto/search-songs.dto';
import { SongsMapper } from './mappers/songs.mapper';
import { PrismaService } from '@libs/prisma/prisma.service';

@Injectable()
export class SongsService {
  constructor(
    private readonly httpService: HttpService,
    private prisma: PrismaService,
  ) {}

  async search(searchSongsDto: SearchSongsDto) {
    const resp = await this.httpService.axiosRef.get(
      'https://api.deezer.com/search',
      {
        params: {
          q: searchSongsDto.input,
        },
      },
    );

    if (resp.status !== 200) {
      throw new BadRequestException(`Ocurrio un error`);
    }

    if (resp.data.data && resp.data.data.length === 0) {
      throw new BadRequestException(
        `No se encontro canciones con ${searchSongsDto.input}`,
      );
    }

    const mapper = resp.data.data.map((x: any) => SongsMapper(x));

    return mapper;
  }
}
