import { BadRequestException, Inject } from '@nestjs/common';

import { SUPABASE_MODULE_KEY } from '@libs/supabase/supabase.module';
import { PhotosStorage } from './photos.storage.interface';
import { SupabaseService } from '@libs/supabase/supabase.service';
import { MIMETYPES } from '@config/mimetypes';

export class PhotosStorageImpl implements PhotosStorage {
  constructor(
    @Inject(SUPABASE_MODULE_KEY)
    private readonly supabaseService: SupabaseService,
  ) {}

  async uploadImage(
    file: Express.Multer.File,
    user_id: string,
    file_name: string,
  ): Promise<string> {
    const resp = await this.supabaseService
      .getClient()
      .storage.from('photos')
      .upload(
        `${user_id}/${file_name}.${MIMETYPES.find((x) => x.name === file.mimetype)?.prefix ?? ''}`,
        Buffer.from(file.buffer),
        {
          cacheControl: '3600',
          contentType:
            MIMETYPES.find((x) => x.name === file.mimetype)?.name ?? '',
          upsert: false,
        },
      );

    if (resp.error) throw new BadRequestException(resp.error.message);

    return resp.data.path;
  }
}
