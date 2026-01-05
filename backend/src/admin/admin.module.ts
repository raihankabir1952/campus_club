import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Club } from './entities/club.entity';
import { User } from './entities/user.entity';
import { Event } from './entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club, User, Event])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
