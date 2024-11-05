export interface PhotosStorage {
  uploadImage(
    file: Express.Multer.File,
    user_id: string,
    file_name: string,
  ): Promise<string>;
}
