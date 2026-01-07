import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from './mail.service'; 
import { Member } from './member.entity';
import { MemberProfile } from './profile.entity';
import { MemberAddress } from './address.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PatchMemberDto } from './dto/patch-member.dto';
import Pusher, * as pusher from 'pusher'; // এটি যোগ করুন(frontend এর জন্য)

@Injectable()
export class MemberService {
private pusher=new Pusher
(
  {
    appId: "2099401",
    key: "ce0131e31a38e14a150f",
    secret: "3ee93fdb3e56fd2dd9b5",
    cluster: "ap2",
    useTLS: true
  }
)

  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    @InjectRepository(MemberProfile)
    private readonly profileRepository: Repository<MemberProfile>,
    
    @InjectRepository(MemberAddress)
    private readonly addressRepository: Repository<MemberAddress>,

    private readonly mailService: MailService, 
  ) {}

  //Get all members 
  async getAllMembers(): Promise<Member[]> {
    return this.memberRepository.find({relations: ['profile', 'addresses']},);
  }

  //Get member by ID
  async getMemberById(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({ where: { id }, relations: ['profile', 'addresses'] });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    return member;
  }

  //Get member by Email
  async getMemberByEmail(email: string): Promise<Member> {
    const member = await this.memberRepository.findOne({ 
      where: { email },
      relations: ['profile', 'addresses']
    });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    return member;
  }

  

  //Create member with hashed password 
  async createMember(data: CreateMemberDto): Promise<Member> {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newMember = this.memberRepository.create({
      ...data,
      password: hashedPassword,
      uuid: uuidv4(),
    });

    const savedMember = await this.memberRepository.save(newMember);
    this.pusher.trigger('member-channel', 'member-added', {
      message: `Welcome ! ${savedMember.name} , you have been successfully registered.`,
    });

    this.mailService.sendWelcomeEmail(data.email, data.name);
    return savedMember;
  }

  //Update member, hash password if updated
  async updateMember(id: number, data: UpdateMemberDto): Promise<Member> {
    const memberToUpdate = await this.memberRepository.findOneBy({ id });
    if (!memberToUpdate) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    const updatedMember = Object.assign(memberToUpdate, data);
    return this.memberRepository.save(updatedMember);
  }

  async patchMember(id: number, data: PatchMemberDto): Promise<Partial<Member>> {
    await this.memberRepository.update(id, data);
    return data;
  }

  async deleteMember(id: number) {
    const member = await this.memberRepository.findOneBy({ id });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);

    await this.addressRepository.delete({ member: { id } });
    await this.memberRepository.remove(member);

    return { message: 'Member deleted', member };
  }

  //Verify password
  async verifyPassword(email: string, password: string): Promise<string> {
    const member = await this.memberRepository.findOne({ where: { email },relations: ['profile']});
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);

    const isMatch = await bcrypt.compare(password, member.password);
    if (!isMatch) throw new HttpException('Invalid password', HttpStatus.BAD_REQUEST);

    return 'Password is correct';
  }

  //CREATE Profile (One-to-One)
  async createProfile(memberId: number, profileData: { age: number, location: string, bio?: string }): Promise<MemberProfile> {
    const member = await this.memberRepository.findOne({ 
      where: { id: memberId },
      relations: ['profile'] 
    });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    if (member.profile) throw new HttpException('Profile already exists', HttpStatus.BAD_REQUEST);

    const profile = this.profileRepository.create({
      ...profileData,
      member: member,
    });

    return this.profileRepository.save(profile);
  }

  //CREATE Address (One-to-Many)
  async createAddress(memberId: number, addressData: { street: string, city: string, country?: string, type?: string }): Promise<MemberAddress> {
    const member = await this.memberRepository.findOne({ where: { id: memberId } });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);

    const address = this.addressRepository.create({
      ...addressData,
      member: member,
    });

    return this.addressRepository.save(address);
  }

  //READ - Get Member with Relations
  async getMemberWithRelations(id: number): Promise<Member> {
    const member = await this.memberRepository.findOne({
      where: { id },
      relations: ['profile', 'addresses'],
    });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    return member;
  }

  //UPDATE Profile
  async updateProfile(memberId: number, profileData: { age?: number, location?: string, bio?: string }): Promise<MemberProfile> {
    const member = await this.memberRepository.findOne({ 
      where: { id: memberId },
      relations: ['profile'] 
    });
    if (!member) throw new HttpException('Member not found', HttpStatus.NOT_FOUND);
    if (!member.profile) throw new HttpException('Profile not found for this member', HttpStatus.NOT_FOUND);

    Object.assign(member.profile, profileData);
    return this.profileRepository.save(member.profile);
  }

  //UPDATE Address
  async updateAddress(addressId: number, addressData: { street?: string, city?: string, country?: string, type?: string }): Promise<MemberAddress> {
    const address = await this.addressRepository.findOne({
      where: { id: addressId },
      relations: ['member'],
    });
    if (!address) throw new HttpException('Address not found', HttpStatus.NOT_FOUND);

    Object.assign(address, addressData);
    return this.addressRepository.save(address);
  }

  //DELETE Address
  async deleteAddress(addressId: number): Promise<{ message: string }> {
    const address = await this.addressRepository.findOne({ where: { id: addressId } });
    if (!address) throw new HttpException('Address not found', HttpStatus.NOT_FOUND);

    await this.addressRepository.remove(address);
    return { message: 'Address deleted successfully' };
  }

  //GET All Addresses for Member
  async getMemberAddresses(memberId: number): Promise<MemberAddress[]> {
    const addresses = await this.addressRepository.find({
      where: { member: { id: memberId } },
      select: ['id', 'street', 'city',], 
      relations: ['member'],
    });
    return addresses;
  }
}

