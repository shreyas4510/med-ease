import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';
import { DoctorService } from './doctor.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Doctor, DoctorSchema } from './doctor.schema';
import { Hospital, HospitalSchema } from '../hospital/hospital.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Doctor.name, schema: DoctorSchema },
      { name: Hospital.name, schema: HospitalSchema },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule {}
