import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class MemberAddress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column({nullable: true})
  country: string;

  @Column({ default: 'home' })
  type: string; 

  //Many-to-One Relationship (Reverse)
  @ManyToOne(() => Member, member => member.addresses)
  member: Member;

}