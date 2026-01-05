import{IsString, IsInt, IsEmail, Min, Max, Matches, IsOptional, IsUrl, IsDateString, IsNotEmpty, IsEnum} from 'class-validator';
export class CreateMemberDto {
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name can only contain letters and spaces' })  
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  @Matches(/^(?=.*[@#$&]).+$/, { message: 'Password must contain at least one special character (@, #, $, &)' })
  password: string;

  @IsOptional()
  @IsEnum(['male', 'female', 'other'], { message: 'Gender must be male, female, or other' })
  gender?: string;

  @IsOptional()
  @IsDateString({}, { message: 'Invalid date format' })
  dob?: string; 

  @IsOptional()
  @IsUrl({}, { message: 'Invalid URL format' })
  facebook?: string;

}