import { IsNotEmpty, IsUUID, IsUrl, Length } from 'class-validator';

export class UploadPhotoDto {
  @IsNotEmpty()
  @IsUUID()
  user_id: string;

  @IsNotEmpty()
  @IsUUID()
  file_id: string;

  @IsNotEmpty()
  @Length(2, 50)
  file_name: string;

  @IsNotEmpty()
  @Length(2, 50)
  file_type: string;

  @IsNotEmpty()
  @IsUrl()
  file_url?: string;
}
