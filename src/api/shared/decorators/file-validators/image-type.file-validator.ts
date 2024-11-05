import { Injectable, FileValidator } from '@nestjs/common';

@Injectable()
export class ImageFileTypeValidator extends FileValidator {
  constructor(private readonly allowedTypes: string[]) {
    super({});
  }

  isValid(file: Express.Multer.File): boolean {
    const mimetype = file.mimetype;
    return this.allowedTypes.includes(mimetype);
  }

  buildErrorMessage(): string {
    return `Invalid file type. Allowed types are: ${this.allowedTypes.join(', ')}`;
  }
}
