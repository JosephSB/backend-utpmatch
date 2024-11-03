import {
  Equals,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
} from 'class-validator';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsBoolean()
  @Equals(true, { message: 'Se tiene que aceptar los terminos y condiciones' })
  terms_conditions: boolean;
}
