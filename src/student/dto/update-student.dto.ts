import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class UpdateStudentDto {

    @IsString()
    name?: string;

    @IsEmail()
    email?: string;

    @IsString()
    password?: string;

    @IsString()
    phone?: string;

    @IsString()
    address?: string;

    @IsString()
    gender?: string;

}
