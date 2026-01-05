import { Body, Controller, Delete, Get, Param, Patch, Post, Put, ParseIntPipe,UseGuards, HttpException, ValidationPipe, UsePipes } from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';
import { JwtAuthGuard } from '../auth_/jwt-auth.guard'; 
import { Member } from './member.entity';
import { CreateProfileDto } from './dto/CreateProfileDto';//new
import { CreateAddressDto } from './dto/CreateAddressDto';//new

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  // @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.memberService.getAllMembers();
  }

  @Get('email/:email')
  getByEmail(@Param('email') email: string) {
  return this.memberService.getMemberByEmail(email);
}

  // @UseGuards(JwtAuthGuard) 
  // @Get(':id')
  // getOne(@Param('id') id: number) {
  //   return this.memberService.getMemberById(id);
  // }
  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(
  @Param('id', new ParseIntPipe({
    errorHttpStatusCode: 400,
    exceptionFactory: () => new HttpException('ID must be a number', 400)
  })) id: number
) {
  return this.memberService.getMemberById(id);
}

  @Post()
  create(@Body() body: CreateMemberDto) {
    return this.memberService.createMember(body);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateMemberDto) {
    return this.memberService.updateMember(id, body);
  }

  @Patch(':id')
  patch(@Param('id', ParseIntPipe) id: number, @Body() body: PatchMemberDto) {
    return this.memberService.patchMember(id, body);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.deleteMember(id);
  }

  @Post('verify-password')
  verifyPassword(@Body('email') email: string, @Body('password') password: string) {
    return this.memberService.verifyPassword(email, password);
  }

  //CREATE Profile (One-to-One)
  // @Post(':id/profile')
  // createProfile(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Body() body: { age: number, location: string, bio?: string }
  // ) {
  //   return this.memberService.createProfile(id, body);
  // }
  @Post(':id/profile')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  createProfile(
  @Param('id', ParseIntPipe) id: number, 
  @Body() body: CreateProfileDto
) {
  return this.memberService.createProfile(id, body);
}

  //CREATE Address (One-to-Many)
  // @Post(':id/address')
  // createAddress(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Body() body: { street: string, city: string, country: string, type?: string }
  // ) {
  //   return this.memberService.createAddress(id, body);
  // }
@Post(':id/address')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
createAddress(
  @Param('id', ParseIntPipe) id: number, 
  @Body() body: CreateAddressDto
) {
  return this.memberService.createAddress(id, body);
}

  //READ with Relations
  @Get(':id/with-relations')
  getWithRelations(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.getMemberWithRelations(id);
  }

  //UPDATE Profile
  // @Patch(':id/profile')
  // updateProfile(
  //   @Param('id', ParseIntPipe) id: number, 
  //   @Body() body: { age?: number, location?: string, bio?: string }
  // ) {
  //   return this.memberService.updateProfile(id, body);
  // }
  
@Patch(':id/profile')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
updateProfile(
  @Param('id', ParseIntPipe) id: number, 
  @Body() body: CreateProfileDto
) {
  return this.memberService.updateProfile(id, body);
}

  // 5. DELETE Profile
  // @Delete(':id/profile')
  // deleteProfile(@Param('id', ParseIntPipe) id: number) {
  //   return this.memberService.deleteProfile(id);
  // }

  //UPDATE Address
  // @Patch('address/:addressId')
  // updateAddress(
  //   @Param('addressId', ParseIntPipe) addressId: number, 
  //   @Body() body: { street?: string, city?: string, country?: string, type?: string }
  // ) {
  //   return this.memberService.updateAddress(addressId, body);
  // }
@Patch('address/:addressId')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
updateAddress(
  @Param('addressId', ParseIntPipe) addressId: number, 
  @Body() body: CreateAddressDto
) {
  return this.memberService.updateAddress(addressId, body);
}

  //DELETE Address
  @Delete('address/:addressId')
  deleteAddress(@Param('addressId', ParseIntPipe) addressId: number) {
    return this.memberService.deleteAddress(addressId);
  }

  //GET All Addresses for Member
  @Get(':id/addresses')
  getAddresses(@Param('id', ParseIntPipe) id: number) {
    return this.memberService.getMemberAddresses(id);
  }
}