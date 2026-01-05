import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty({ message: 'Street is required' })
  @IsString()
  street: string;

  @IsNotEmpty({ message: 'City is required' })
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  type?: string;
}
