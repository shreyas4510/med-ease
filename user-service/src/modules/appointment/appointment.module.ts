import { Module } from '@nestjs/common';
import { AppointmentController } from './appointment.controller';
import { AppointmentService } from './appointment.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema, Patient, PatientSchema } from './appointment.schema';
import { Hospital, HospitalSchema } from '../hospital/hospital.schema';
import { Doctor, DoctorSchema } from '../doctor/doctor.schema';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forFeature([
      { name: Patient.name, schema: PatientSchema },
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Hospital.name, schema: HospitalSchema },
      { name: Doctor.name, schema: DoctorSchema }
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, KafkaService]
})
export class AppointmentModule {}
