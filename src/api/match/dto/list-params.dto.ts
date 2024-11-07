import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class ListParamsDto {
  @IsNotEmpty()
  @Transform(({ value }) => {
    return Number(value);
  })
  @IsInt()
  @Min(0)
  page: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Transform(({ value }) => {
    return Number(value);
  })
  size?: number;

  constructor(partial: Partial<ListParamsDto>) {
    Object.assign(this, partial);
    this.page = this.page ?? 1;
    this.size = this.size ?? 10;
  }
}
