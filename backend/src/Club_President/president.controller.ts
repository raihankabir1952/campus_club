import { Controller, Get, Post, Put, Patch, Delete, Body, Param } from '@nestjs/common';
import { PresidentService } from './president.service';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventDto } from './dto/event.dto';

@Controller()
export class PresidentController {
  constructor(private readonly presidentService: PresidentService) {}


  @Post('add-member')
  addMember(@Body() member: MemberDto) {
    return this.presidentService.addMember(member);
  }


  @Delete('delete-member/:memberId')
  deleteMember(@Param('memberId') memberId: string) {
    return this.presidentService.deleteMember(memberId);
  }


  @Post('create-event')
  createEvent(@Body() event: EventDto) {
    return this.presidentService.createEvent(event);
  }


  @Put('update-event/:eventId')
  updateEvent(@Param('eventId') eventId: string, @Body() event: EventDto) {
    return this.presidentService.updateEvent(eventId, event);
  }


  @Delete('delete-event/:eventId')
  deleteEvent(@Param('eventId') eventId: string) {
    return this.presidentService.deleteEvent(eventId);
  }


  @Get('view-report/:clubId')
  viewReport(@Param('clubId') clubId: string, @Body() body: { clubReport: string }) {
    return this.presidentService.viewReport(clubId, body.clubReport);
  }
  

  @Put('update-club/:clubId')
  updateClub(@Param('clubId') clubId: string, @Body() data: ClubDto) {
    return this.presidentService.updateClub(clubId, data);
  }


  @Patch('change-member-role/:memberId')
  changeMemberRole(@Param('memberId') memberId: string, @Body() body: { role: string }) {
    return this.presidentService.changeMemberRole(memberId, body.role);
  }


  @Get('preview-future-events/:clubId')
  previewFutureEvents(@Param('clubId') clubId: string) {
    return this.presidentService.previewFutureEvents(clubId);
  }

}
