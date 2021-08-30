import { IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/swagger';

export class CreateAddress {
  @IsString()
  @IsNotEmpty()
  readonly department: string;

  @IsString()
  @IsNotEmpty()
  readonly city: string;

  @IsString()
  @IsNotEmpty()
  readonly street: string;

  @IsString()
  @IsNotEmpty()
  readonly number: string;
}

export class UpdateAddress extends PartialType(CreateAddress) {}
