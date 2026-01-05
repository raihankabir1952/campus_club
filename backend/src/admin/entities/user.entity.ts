import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Club } from './club.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  role: string; // 'admin' | 'president' | 'member'

  @OneToMany(() => Club, (club) => club.president)
  presidentOf: Club[];
}
