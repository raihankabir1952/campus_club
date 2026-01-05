import { isString } from "class-validator";

export class CreateClubDto {
    name: string;
    description: string;
    presidentId: string;
    establishedDate: string;
    isActive: boolean;
    tags: string[];
    logoUrl?: string;

    constructor(partial: Partial<CreateClubDto>) {
        Object.assign(this, partial);
    }}

export function isCreateClubDto(object: any): object is CreateClubDto {
    return (
        object instanceof CreateClubDto &&
        isString(object.name) &&
        isString(object.description) &&
        isString(object.presidentId) &&
        isString(object.establishedDate) &&
        typeof object.isActive === "boolean" &&
        Array.isArray(object.tags) &&
        (object.logoUrl === undefined || isString(object.logoUrl))
    );
}



