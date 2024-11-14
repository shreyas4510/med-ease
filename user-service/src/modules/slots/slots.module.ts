import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { KafkaService } from '../kafka/kafka.service';
import { HttpModule } from "@nestjs/axios";
import { AppointmentService } from '../appointment/appointment.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema, Patient, PatientSchema } from '../appointment/appointment.schema';
import { Doctor, DoctorSchema } from '../doctor/doctor.schema';
import { Hospital, HospitalSchema } from '../hospital/hospital.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Patient.name, schema: PatientSchema },
      { name: Doctor.name, schema: DoctorSchema },
      { name: Hospital.name, schema: HospitalSchema }
    ]),
  ],
  controllers: [SlotsController],
  providers: [
    SlotsService,
    KafkaService,
    AppointmentService
  ]
})
export class SlotsModule {}
