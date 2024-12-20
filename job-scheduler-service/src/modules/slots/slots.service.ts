import { Injectable, NotFoundException } from '@nestjs/common';
import { SlotsDto, CreateSlotsDto, WeekDays, AppointmentBookDto } from './slots.dto';
import * as moment from 'moment';
import { InjectModel } from '@nestjs/mongoose';
import { Slots, SlotsDocument } from './slots.schema';
import { Model } from 'mongoose';
import { QueueService } from '../queue/queue.service';
import { QueueProcessor } from '../queue/queue.processor';
import { Job } from './jobs.schema';
import { Job as QueueJob } from 'bullmq';
import { GatewayService } from '../../gateway/gateway.service';

@Injectable()
export class SlotsService {
    constructor(
        @InjectModel(Slots.name) private slotsModel: Model<Slots>,
        @InjectModel(Job.name) private jobModel: Model<Job>,
        private queueService: QueueService,
        private queueProcessor: QueueProcessor,
        private gatewayService: GatewayService
    ) { }


    getDaySlots(dayStartTime, dayEndTime, daySlotsList) {
        try {
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
        } catch (error) {
            throw error;
        }
    }

    getRoundToNextQuarterHour() {
        try {
            let now = moment();
            let minutes = now.minutes();

            let minutesToAdd = 15 - (minutes % 15);
            if (minutesToAdd === 15) {
                minutesToAdd = 0;
            }

            now.add(minutesToAdd, 'minutes');
            return now.format('HH:mm');
        } catch (error) {
            throw error;
        }
    }

    async saveSlots(finalSlots) {
        try {
            const slots = [...finalSlots];
            await this.slotsModel.insertMany(slots)
            this.gatewayService.handleNotification('Slots created successfully');
        } catch (error) {
            if (error.code === 11000) {
                this.gatewayService.handleNotification(
                    'Error in creating slots duplicate slots created. Please try again'
                );
            } else {
                console.error('Error creating slot:', error);
                this.gatewayService.handleNotification( error.message );
            }
        }
    }

    async createSlots(data: CreateSlotsDto): Promise<void> {
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

    async removeSlots(data: SlotsDto): Promise<void> {
        try {
            let { startDate, endDate, weekDays } = data;
            let curDate = moment(startDate, 'DD-MM-YYYY');
            const dates = [];
            while (curDate.isSameOrBefore(moment(endDate, 'DD-MM-YYYY'))) {
                const weekDay = curDate.format('ddd') as WeekDays;
                if (!weekDays.includes(weekDay)) {
                    curDate = curDate.add(1, 'day');
                    continue;
                }
                dates.push(curDate.format('DD-MM-YYYY'));
                curDate = curDate.add(1, 'day');
            }

            await this.slotsModel.deleteMany({
                date: {
                    $in: dates
                },
                hospitalId: data.hospital,
                doctorId: data.doctor
            });

            this.gatewayService.handleNotification(
                'Available slots are removed successfully. You will still find the booked slots'
            );
        } catch (error) {
            throw error;
        }
    }

    async getSlots(data: Partial<SlotsDto>): Promise<Array<SlotsDocument>> {
        try {
            let { startDate, endDate, available } = data;

            const dates = []
            let curDate = moment(startDate, 'DD-MM-YYYY');
            while (curDate.isSameOrBefore(moment(endDate, 'DD-MM-YYYY'))) {
                dates.push(curDate.format('DD-MM-YYYY'));
                curDate = curDate.add(1, 'day');
            }

            const query: Record<string, string | boolean | object> = {
                date: {
                    $in: dates
                },
                hospitalId: data.hospital,
                doctorId: data.doctor
            }

            if (available) {
                query.status = 'AVAILABLE';
            }

            const res = await this.slotsModel.find(query);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async calculateDelays(slot: Slots): Promise<{ preDelay: string, postDelay: string }> {
        const startTime = moment(slot.startTime, 'hh:mm A');
        const endTime = moment(slot.endTime, 'hh:mm A');

        const preDelay = startTime.subtract(30, 'minutes').format('hh:mm A');
        const postDelay = endTime.add(30, 'minutes').format('hh:mm A');

        return { preDelay, postDelay };
    }

    async addJobToQueue(type: string, appointment: AppointmentBookDto, slot: Slots) {
        const { preDelay, postDelay } = await this.calculateDelays(slot);

        let jobTime: string;
        let message: string;

        if (type === 'PRE') {
            jobTime = preDelay;
            message = `
                Hi ${appointment.patientName}!\nReminder: Appointment with Dr. ${appointment.doctorName} at ${slot.startTime}\nThank you!
            `;
        } else {
            jobTime = postDelay;
            message = `
               Hi ${appointment.patientName}!\nPlease rate the doctor's service on a scale of 1 to 5.\nReply with "RATING - X".Thank you!
            `;
        }

        const job = new this.jobModel({
            type,
            time: jobTime,
            date: slot.date,
            appointmentId: appointment.appointmentId,
            message,
            contact: appointment.patientContact,
        });
        await job.save();

        const delay = moment(`${slot.date}, ${jobTime}`, 'DD-MM-YYYY, hh:mm A').diff(
            moment(), 'milliseconds'
        );

        if (type === 'BOOK') {
            await this.queueProcessor.process({
                data: {
                    patientContact: appointment.patientContact,
                    message: slot.title,
                    patientEmail: appointment.patientEmail,
                    type: type,
                    patientId: appointment.patientId,
                    appointmentId: appointment.appointmentId,
                    doctorId: appointment.doctorId
                }
            } as QueueJob);
        } else {
            await this.queueService.addJob({
                patientContact: appointment.patientContact,
                message,
                patientEmail: appointment.patientEmail,
                type: type,
                patientId: appointment.patientId,
                appointmentId: appointment.appointmentId,
                doctorId: appointment.doctorId
            }, delay);
        }
    }

    async bookAppointment(appointment: AppointmentBookDto) {
        const slot = await this.slotsModel.findOne({
            _id: appointment.slotId,
            status: 'AVAILABLE'
        });
        if (!slot) {
            throw new NotFoundException('Slot not found.');
        }

        slot.title = `Appointment with Dr. ${appointment.doctorName} at ${slot.startTime} \nVenue: ${appointment.hospitalName} ,${appointment.hospitalAddress}`;
        slot.patientId = appointment.patientId;
        slot.status = 'BOOKED';
        await slot.save();

        const jobTypes = ['PRE', 'POST', 'BOOK'];
        await Promise.all(jobTypes.map(type => {
            return this.addJobToQueue(type, appointment, slot);
        }));
    }
}
