
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Matches, IsMongoId } from 'class-validator';

export enum WeekDays {
    Mon = 'Mon',
    Tue = 'Tue',
    Wed = 'Wed',
    Thu = 'Thu',
    Fri = 'Fri',
    Sat = 'Sat',
    Sun = 'Sun',
}

export class CreateSlotsDto {
    @IsArray()
    @IsEnum(WeekDays, { each: true })
    weekDays: WeekDays[];

    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'endDate must be in format DD-MM-YYYY',
    })
    endDate: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/, {
        message: 'dayStartTime must be in format hh:mm A',
    })
    dayStartTime: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^(0[1-9]|1[0-2]):([0-5][0-9]) (AM|PM)$/, {
        message: 'dayEndTime must be in format hh:mm A',
    })
    dayEndTime: string;

    @IsString()
    doctor: string;

    @IsString()
    hospital: string;
}

export class SlotsDto {
    @IsArray()
    @IsEnum(WeekDays, { each: true })
    weekDays: WeekDays[];

    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'endDate must be in format DD-MM-YYYY',
    })
    startDate: string;

    @IsNotEmpty()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'endDate must be in format DD-MM-YYYY',
    })
    endDate: string;

    @IsString()
    doctor: string;

    @IsString()
    hospital: string;

    @IsOptional()
    available: boolean;
}

export class AppointmentBookDto {
    @IsNotEmpty()
    @IsString()
    slotId: string;

    @IsNotEmpty()
    @IsMongoId()
    patientId: string;

    @IsNotEmpty()
    @IsString()
    patientName: string;

    @IsNotEmpty()
    @IsString()
    patientEmail: string;

    @IsNotEmpty()
    @IsString()
    patientContact: string;

    @IsNotEmpty()
    @IsString()
    hospitalName: string;

    @IsNotEmpty()
    @IsString()
    hospitalAddress: string;

    @IsNotEmpty()
    @IsString()
    doctorName: string;

    @IsNotEmpty()
    @IsMongoId()
    appointmentId: string;

    @IsNotEmpty()
    @IsString()
    appointmentTitle: string;
}
