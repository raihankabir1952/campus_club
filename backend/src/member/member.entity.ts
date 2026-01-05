import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { MemberProfile } from './profile.entity';
import { MemberAddress } from './address.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true })
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  password: string;

  @Column({ 
    type: 'enum', 
    enum: ['male', 'female', 'other'],
    default: 'male',    
    nullable: true       
  })
  gender?: string;

  @Column({ nullable: true })
  dob?: string;

  @CreateDateColumn()
  joiningDate: Date;

  //One-to-One Relationship
  @OneToOne(() => MemberProfile, profile => profile.member, { 
    cascade: true,
    //eager: true, // Automatically load profile with member
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  profile?: MemberProfile;

  //One-to-Many Relationship
  @OneToMany(() => MemberAddress, address => address.member, { 
    // cascade: true,
    onDelete: 'CASCADE'
  })
  addresses: MemberAddress[];
}









