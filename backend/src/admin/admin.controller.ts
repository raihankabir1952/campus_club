import {
    Controller,
    Post,
    Patch,
    Delete,
    Get,
    Param,
    Body,
    UseGuards,
    ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateClubDto } from './dto/create-club.dto';
import { UpdateClubDto } from './dto/update-club.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }

    @Post('create-club')
    createClub(@Body() dto: CreateClubDto) {
        return this.adminService.createClub(dto);
    }

    @Patch('update-club/:id')
    updateClub(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateClubDto) {
        return this.adminService.updateClub(id, dto);
    }

    @Delete('delete-club/:id')
    deleteClub(@Param('id', ParseIntPipe) id: number) {
        return this.adminService.deleteClub(id);
    }

    @Patch('assign-president/:clubId/:userId')
    assignPresident(
        @Param('clubId', ParseIntPipe) clubId: number,
        @Param('userId', ParseIntPipe) userId: number,
    ) {
        return this.adminService.assignPresident(clubId, userId);
    }

    @Get('clubs')
    getClubs() {
        return this.adminService.getAllClubs();
    }

    @Get('users')
    getUsers() {
        return this.adminService.getAllUsers();
    }

    @Get('reports')
    getReports() {
        return this.adminService.getReports();
    }

    @Get('events')
    getEvents() {
        return this.adminService.getAllEvents();
    }
}
