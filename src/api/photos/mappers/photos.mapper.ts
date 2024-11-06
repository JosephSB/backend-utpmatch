import { IPhoto } from '../entities/photo.entity';

export const PhotosMapper = (data: any): IPhoto => {
  return {
    photo_id: data.photo_id,
    user_id: data.user_id,
    file_name: data.file_name,
    file_url: data.file_url,
    medium_url: data.medium_url,
    thumbnail_url: data.thumbnail_url,
    order: data.order,
    is_active: data.is_active,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  };
};
