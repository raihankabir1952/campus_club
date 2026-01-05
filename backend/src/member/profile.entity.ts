import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column({ nullable: true })
  bio: string;

  //One-to-One Relationship (Reverse)
  @OneToOne(() => Member, member => member.profile)
  member: Member;


}