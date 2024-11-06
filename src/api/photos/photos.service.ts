import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

import { PhotosStorageImpl } from './storage/photos.storage.impl';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';
import config from '@config/index';
import { PrismaService } from '@libs/prisma/prisma.service';
import { PhotosMapper } from './mappers/photos.mapper';
import { MIMETYPES } from '@config/mimetypes';

@Injectable()
export class PhotosService {
  constructor(
    private readonly photosStorage: PhotosStorageImpl,
    private prisma: PrismaService,
  ) {}

  private async uploadPhotoSharp(
    file_id: string,
    file: Express.Multer.File,
    userRequest: IUserPayloadToken,
    size: number,
    name_sharp: string,
  ) {
    const buffer_image_sharp = await sharp(file.buffer)
      .resize({
        width: size,
        height: size,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();

    const path = await this.photosStorage.uploadImage(
      { ...file, buffer: buffer_image_sharp },
      userRequest.user_id,
      `${file_id}-${name_sharp}`,
    );

    return path;
  }

  async upload(file: Express.Multer.File, userRequest: IUserPayloadToken) {
    const file_id = uuidv4();

    const ext = MIMETYPES.find((x) => x.name === file.mimetype)?.prefix ?? '';

    const temp_path = `${userRequest.user_id}/${file_id}`;

    this.photosStorage.uploadImage(file, userRequest.user_id, file_id);
    this.uploadPhotoSharp(file_id, file, userRequest, 900, 'medium');
    this.uploadPhotoSharp(file_id, file, userRequest, 300, 'thumbnail');

    const photo = await this.prisma.photos.create({
      data: {
        photo_id: file_id,
        user_id: userRequest.user_id,
        file_name: file.originalname,
        file_url: config.SUPABASE.URL_BUCKET + temp_path + `.${ext}`,
        medium_url: config.SUPABASE.URL_BUCKET + temp_path + `-medium.${ext}`,
        thumbnail_url:
          config.SUPABASE.URL_BUCKET + temp_path + `-thumbnail.${ext}`,
        order: 0,
      },
    });

    return {
      message: 'ok',
      data: PhotosMapper(photo),
    };
  }
}
