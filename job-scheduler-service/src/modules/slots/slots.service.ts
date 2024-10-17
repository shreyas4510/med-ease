import { Injectable } from '@nestjs/common';
import { RemoveSlotsDto, SlotsDto, WeekDays } from './slots.dto';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Slots } from './slots.schema';
import { Model } from 'mongoose';

@Injectable()
export class SlotsService {
    constructor(
        @InjectModel(Slots.name) private slotsModal: Model<Slots>
    ) { }


    getDaySlots(dayStartTime, dayEndTime, daySlotsList) {
        while (
            moment(dayStartTime, 'hh:mm A').isBefore(moment(dayEndTime, 'hh:mm A'))
        ) {
            const endTime = moment(dayStartTime, 'hh:mm A')
                .add(15, 'minute')
                .format('hh:mm A');
            daySlotsList.push({
                startTime: dayStartTime,
                endTime
            })
            dayStartTime = endTime;
        }
    }

    getRoundToNextQuarterHour() {
        let now = moment();
        let minutes = now.minutes();

        let minutesToAdd = 15 - (minutes % 15);
        if (minutesToAdd === 15) {
            minutesToAdd = 0;
        }

        now.add(minutesToAdd, 'minutes');
        return now.format('HH:mm');
    }

    async saveSlots(finalSlots) {
        try {
            const slots = [...finalSlots];
            await this.slotsModal.insertMany(slots)
        } catch (error) {
            if (error.code === 11000) {
                // TODO: Notify frontend using Socket on duplicate records
            } else {
                console.error('Error creating slot:', error);
                // TODO: Notify frontend using Socket on error
            }
        }
    }

    async createSlots(data: SlotsDto): Promise<void> {
        try {
            // Break Day wise slots
            let { dayStartTime, dayEndTime } = data;
            const daySlotsList = [];
            this.getDaySlots(dayStartTime, dayEndTime, daySlotsList);

            // Create data for week wise slots
            let curDate = moment();
            let endDate = moment(data.endDate, 'DD-MM-YYYY') || moment().endOf('year');

            let finalSlots = [];
            while (curDate.isSameOrBefore(endDate)) {
                const weekDay = curDate.format('ddd') as WeekDays;
                if (!data.weekDays.includes(weekDay)) {
                    curDate = curDate.add(1, 'day');
                    continue;
                }

                daySlotsList.map((slot) => {
                    finalSlots.push({
                        date: curDate.format('DD-MM-YYYY'),
                        ...slot,
                        status: 'AVAILABLE',
                        patientId: null,
                        doctorId: data.doctor,
                        hospitalId: data.hospital
                    })

                    if (finalSlots.length >= 3000) {
                        this.saveSlots(finalSlots);
                        finalSlots = [];
                    }
                })
                curDate = curDate.add(1, 'day');
            }

            if (finalSlots.length) {
                this.saveSlots(finalSlots);
                finalSlots = [];
            }
        } catch (error) {
            throw error;
        }
    }

    async removeSlots(data: RemoveSlotsDto): Promise<void> {
        try {
            // Break Day wise slots
            let { startDate, endDate, weekDays } = data;
            let curDate = moment(startDate, 'DD-MM-YYYY');
            const dates = [];
            while (curDate.isSameOrBefore( moment(endDate, 'DD-MM-YYYY') )) {
                const weekDay = curDate.format('ddd') as WeekDays;
                if (!weekDays.includes(weekDay)) {
                    curDate = curDate.add(1, 'day');
                    continue;
                }
                dates.push( curDate.format('DD-MM-YYYY') );
                curDate = curDate.add(1, 'day');
            }

            await this.slotsModal.deleteMany({
                date: {
                    $in: dates
                },
                hospitalId: data.hospital,
                doctorId: data.doctor
            });
            
            // TODO: Notify Frontend and slots deletion
        } catch (error) {
            throw error;
        }
    }
}
