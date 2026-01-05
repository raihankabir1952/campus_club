import { IsNotEmpty, IsInt, Min, IsString, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty({ message: 'Age is required' })
  @IsInt({ message: 'Age must be a number' })
  @Min(1, { message: 'Age must be at least 1' })
  age: number;

  @IsNotEmpty({ message: 'Location is required' })
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
