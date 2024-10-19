
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

enum WeekDays {
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

    @IsOptional()
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
}

export class SlotsDto {
    @IsArray()
    @IsEnum(WeekDays, { each: true })
    weekDays: WeekDays[];

    @IsOptional()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'endDate must be in format DD-MM-YYYY',
    })
    startDate: string;

    @IsOptional()
    @Matches(/^\d{2}-\d{2}-\d{4}$/, {
        message: 'endDate must be in format DD-MM-YYYY',
    })
    endDate: string;
}
