import { Injectable } from '@nestjs/common';
import { MemberDto } from './dto/member.dto';
import { ClubDto } from './dto/club.dto';
import { EventDto } from './dto/event.dto';

@Injectable()
export class PresidentService {


  addMember(member: MemberDto) {
    const { name, username, id, role } = member;
    return `Member Added Successfully! Name: ${name}, Username: ${username}, ID: ${id}, Role: ${role}`;
  }


  deleteMember(memberId: string) {
    return `Member with ID-${memberId} Deleted Successfully!`;
  }


  createEvent(event: EventDto) {
    const { eventId, eventName, eventcategory, eventDate } = event;
    return `Event created Successfully! ID: ${eventId}, Name: ${eventName}, Category: ${eventcategory}, Date: ${eventDate}`;
  }


  updateEvent(eventId: string, event: EventDto) {
    const { eventName, eventcategory, eventDate } = event;
    return `Event updated Successfully! Updated ID: ${eventId}, Name: ${eventName}, Category: ${eventcategory}, Date: ${eventDate}`;
  }


  deleteEvent(eventId: string) {
    return `Event deleted Successfully! ID: ${eventId}`;
  }


  viewReport(clubId: string, clubReport: string) {
  return `Report for club ID: ${clubId}, Report: ${clubReport}`;
  }


  updateClub(clubId: string, data: ClubDto) {
    const { clubName, clubReport } = data;
    return `Club updated Successfully! Updated ID: ${clubId}, Name: ${clubName}, Report: ${clubReport}`;
  }


  changeMemberRole(memberId: string, role: string) {
    return `Member role updated! ID: ${memberId}, New Role: ${role}`;
  }


  previewFutureEvents(clubId: string) {
    return `Future events for club ID: ${clubId}: Event 1, Event 2`;
  }

}
