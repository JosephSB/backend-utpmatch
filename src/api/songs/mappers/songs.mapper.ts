import { ISong } from '../entities/song.entity';

export const SongsMapper = (data: any): ISong => {
  return {
    song_id: data.id,
    title: data.title,
    url_preview: data.preview,
    song_image: data.album.cover_xl,
    song_image_thumbnail: data.album.cover_medium,
    artist_name: data.artist.name,
  };
};
