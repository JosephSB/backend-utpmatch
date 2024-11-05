import { Injectable } from '@nestjs/common';
import { FileValidator } from '@nestjs/common';
import sharp from 'sharp';

@Injectable()
export class MinImageDimensionsValidator extends FileValidator {
  constructor(
    private readonly minWidth: number,
    private readonly minHeight: number,
  ) {
    super({});
  }

  async isValid(file: Express.Multer.File): Promise<boolean> {
    try {
      const metadata = await sharp(file.buffer).metadata();
      if (!metadata.width || !metadata.height) throw new Error('Error');
      return (
        metadata.width >= this.minWidth && metadata.height >= this.minHeight
      );
    } catch (error) {
      return false;
    }
  }

  buildErrorMessage(): string {
    return `Image dimensions should be at least ${this.minWidth}x${this.minHeight}px`;
  }
}
