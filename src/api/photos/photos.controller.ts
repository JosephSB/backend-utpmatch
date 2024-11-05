import {
  Controller,
  Post,
  VERSION_NEUTRAL,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PhotosService } from './photos.service';
import config from '@config/index';
import { IUserPayloadToken } from '@api/auth/entities/auth.entity';
import { UserRequest } from '@api/shared/decorators/user-token.decorator';
import { ImageFileTypeValidator } from '@api/shared/decorators/file-validators/image-type.file-validator';
import { MinImageDimensionsValidator } from '@api/shared/decorators/file-validators/image-dimension.file-validator';
import { MIMETYPES } from '@config/mimetypes';

@Controller({
  path: 'api/photos',
  version: VERSION_NEUTRAL,
})
export class PhotosController {
  constructor(private readonly photosService: PhotosService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: config.FILE.MAX_SIZE }),
          new ImageFileTypeValidator(MIMETYPES.map((x) => x.name)),
          new MinImageDimensionsValidator(
            config.FILE.IMAGE.MIN_WIDTH,
            config.FILE.IMAGE.MIN_HEIGHT,
          ),
        ],
      }),
    )
    file: Express.Multer.File,
    @UserRequest() userRequest: IUserPayloadToken,
  ) {
    return this.photosService.upload(file, userRequest);
  }
}
