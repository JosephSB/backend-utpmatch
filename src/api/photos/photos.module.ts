import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { PhotosStorageImpl } from './storage/photos.storage.impl';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, PhotosStorageImpl],
})
export class PhotosModule {}
