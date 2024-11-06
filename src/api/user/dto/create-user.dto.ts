import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  Length,
  MaxDate,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @Length(2, 50)
  name: string;

  @IsNotEmpty()
  @Length(2, 50)
  lastname: string;

  @IsNotEmpty()
  @Length(2, 1000)
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    format: 'date',
    example: new Date(1986, 11, 11),
  })
  @Type(() => Date)
  @MaxDate(() => new Date(), {
    message: () =>
      `maximal allowed date for date of birth is ${new Date().toDateString()}`,
  })
  birthdate: Date;

  @IsNotEmpty()
  @MaxLength(10)
  contact_phone: string;

  @IsNotEmpty()
  @IsNumber()
  career_id: number;

  @IsNotEmpty()
  @IsNumber()
  intention_id: number;

  @IsNotEmpty()
  @IsNumber()
  campus_id: number;

  @IsNotEmpty()
  @IsArray()
  interests: number[];
}
