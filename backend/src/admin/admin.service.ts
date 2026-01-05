import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Club } from './entities/club.entity';
import { Event } from './entities/event.entity';
import { User } from './entities/user.entity';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Club) private clubRepo: Repository<Club>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Event) private eventRepo: Repository<Event>,
  ) {}

  // 1️⃣ Create a new club
  async createClub(dto: CreateClubDto) {
    const club = this.clubRepo.create(dto);
    return this.clubRepo.save(club);
  }

  // 2️⃣ Update existing club
  async updateClub(id: number, dto: UpdateClubDto) {
    await this.clubRepo.update(id, dto);
    return this.clubRepo.findOne({ where: { id } });
  }

  // 3️⃣ Delete a club
  async deleteClub(id: number) {
    const club = await this.clubRepo.findOne({ where: { id } });
    if (!club) throw new NotFoundException('Club not found');
    return this.clubRepo.remove(club);
  }

  // 4️⃣ Assign/change president
  async assignPresident(clubId: number, userId: number) {
    const club = await this.clubRepo.findOne({ where: { id: clubId } });
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!club || !user) throw new NotFoundException('Club or User not found');

    club.president = user;
    await this.clubRepo.save(club);
    return club;
  }

  // 5️⃣ Get all clubs
  async getAllClubs() {
    return this.clubRepo.find({ relations: ['president'] });
  }

  // 6️⃣ Manage all users
  async getAllUsers() {
    return this.userRepo.find();
  }

  // 7️⃣ Reports
  async getReports() {
    const clubCount = await this.clubRepo.count();
    const eventCount = await this.eventRepo.count();
    const userCount = await this.userRepo.count();
    return { clubCount, eventCount, userCount };
  }

  // 8️⃣ All events
  async getAllEvents() {
    return this.eventRepo.find({ relations: ['club'] });
  }

  // 9️⃣ Delete an event
  async deleteEvent(id: number) {
    const event = await this.eventRepo.findOne({ where: { id } });
    if (!event) throw new NotFoundException('Event not found');
    return this.eventRepo.remove(event);
  }
}
