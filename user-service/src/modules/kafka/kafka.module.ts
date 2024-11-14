import { forwardRef, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentModule } from '../appointment/appointment.module';  // Import AppointmentModule with forwardRef
import { Appointment, AppointmentSchema, Patient, PatientSchema } from '../appointment/appointment.schema';
import { Hospital, HospitalSchema } from '../hospital/hospital.schema';
import { Doctor, DoctorSchema } from '../doctor/doctor.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Patient.name, schema: PatientSchema },
            { name: Appointment.name, schema: AppointmentSchema },
            { name: Hospital.name, schema: HospitalSchema },
            { name: Doctor.name, schema: DoctorSchema }
        ]),
        forwardRef(() => AppointmentModule)
    ],
    providers: [KafkaService],
    exports: [KafkaService]
})
export class KafkaModule {}
