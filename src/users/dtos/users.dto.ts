import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  @IsNotEmpty()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly surname: string;

  @IsDate()
  @IsNotEmpty()
  readonly birthDate: Date;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;
}
