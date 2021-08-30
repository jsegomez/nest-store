import { PartialType } from '@nestjs/swagger';
import { CreateAddress } from './address.dto';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  readonly lastName: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly phone: number;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @ValidateNested()
  readonly address: CreateAddress;
}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
