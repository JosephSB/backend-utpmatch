export interface IPhoto {
  photo_id: string;
  user_id: string;
  file_name: string;
  file_url: string;
  medium_url: string;
  thumbnail_url: string;
  order: string;
  is_active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
