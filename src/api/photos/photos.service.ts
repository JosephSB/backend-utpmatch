import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

import { PhotosStorageImpl } from './storage/photos.storage.impl';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';
import config from '@config/index';

@Injectable()
export class PhotosService {
  constructor(private readonly photosStorage: PhotosStorageImpl) {}

  async upload(file: Express.Multer.File, userRequest: IUserPayloadToken) {
    const file_id = uuidv4();

    const buffer_image_medium = await sharp(file.buffer)
      .resize({
        width: 900,
        height: 900,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();

    const buffer_image_thumbnail = await sharp(file.buffer)
      .resize({
        width: 300,
        height: 300,
        fit: sharp.fit.inside,
        withoutEnlargement: true,
      })
      .toBuffer();

    const url_medium = await this.photosStorage.uploadImage(
      { ...file, buffer: buffer_image_medium },
      userRequest.user_id,
      `${file_id}-medium`,
    );

    const url_thumbnail = await this.photosStorage.uploadImage(
      { ...file, buffer: buffer_image_thumbnail },
      userRequest.user_id,
      `${file_id}-thumbnail`,
    );

    const url = await this.photosStorage.uploadImage(
      file,
      userRequest.user_id,
      file_id,
    );

    return {
      message: 'ok',
      data: {
        file_id,
        thumbnail: config.SUPABASE.URL_BUCKET + url_thumbnail,
        medium: config.SUPABASE.URL_BUCKET + url_medium,
        original: config.SUPABASE.URL_BUCKET + url,
      },
    };
  }
}
