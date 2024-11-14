import { IsString, IsNotEmpty, IsEmail, IsPhoneNumber, IsDateString } from 'class-validator';

export class AppointmentNotificationDto {
    @IsNotEmpty()
    @IsString()
    patientContact: string;

    @IsNotEmpty()
    @IsString()
    message: string;

    @IsNotEmpty()
    @IsEmail()
    patientEmail: string;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    patientId: string;

    @IsNotEmpty()
    @IsString()
    appointmentId: string;

    @IsNotEmpty()
    @IsString()
    doctorId: string;
}
