import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator';

export class AppointmentNotificationDto {
    @IsNotEmpty()
    @IsString()
    patientName: string;

    @IsNotEmpty()
    @IsString()
    patientContact: string;

    @IsNotEmpty()
    @IsEmail()
    patientEmail: string;

    @IsNotEmpty()
    @IsString()
    doctorName: string;

    @IsNotEmpty()
    @IsString()
    hospitalName: string;

    @IsNotEmpty()
    @IsString()
    hospitalAddress: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsDateString()
    appointmentDate: string;

    @IsNotEmpty()
    @IsString()
    appointmentTime: string;
}
