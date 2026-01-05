import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { IsString, IsBoolean, IsDateString, IsArray, IsOptional } from "class-validator";

@Entity()
export class UpdateClubDto {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    presidentId: string;

    @Column()
    establishedDate: string;

    @Column()
    isActive: boolean;

    @Column("text", { array: true })
    tags: string[];

    @Column({ nullable: true })
    logoUrl?: string;

    constructor(partial: Partial<UpdateClubDto>) {
        Object.assign(this, partial);
    }
}
