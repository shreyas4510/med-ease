import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches } from "class-validator";

export class CreateAppointmentDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    age: number;

    @IsString()
    @IsNotEmpty()
    @Matches(/^[0-9]{10}$/, {
        message: 'Contact must be a valid 10-digit number',
    })
    contact: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    hospital: string;

    @IsString()
    @IsNotEmpty()
    speciality: string;

    @IsString()
    @IsNotEmpty()
    doctor: string;

    @IsString()
    @IsNotEmpty()
    appointmentDate: String;

    @IsString()
    @IsNotEmpty()
    slot: string;
}
