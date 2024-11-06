import { Module } from '@nestjs/common';
import { PhotosService } from './photos.service';
import { PhotosController } from './photos.controller';
import { PhotosStorageImpl } from './storage/photos.storage.impl';
import { PrismaService } from '@libs/prisma/prisma.service';

@Module({
  controllers: [PhotosController],
  providers: [PhotosService, PhotosStorageImpl, PrismaService],
})
export class PhotosModule {}
