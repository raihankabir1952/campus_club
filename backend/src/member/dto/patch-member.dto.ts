import { PartialType } from '@nestjs/mapped-types';
import { CreateMemberDto } from './create-member.dto';
export class PatchMemberDto extends PartialType(CreateMemberDto) {}