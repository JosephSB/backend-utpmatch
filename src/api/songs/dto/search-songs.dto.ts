import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class SearchSongsDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(100)
  @Type(() => Number)
  limit: number;

  @IsNotEmpty()
  @Length(1, 50)
  input: string;

  constructor(partial: Partial<SearchSongsDto>) {
    Object.assign(this, partial);
    this.page = this.page ?? 1;
    this.limit = this.limit ?? 20;
  }
}
