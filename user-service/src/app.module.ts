import { Module } from '@nestjs/common';
import { HospitalModule } from './modules/hospital/hospital.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DoctorModule } from './modules/doctor/doctor.module';
import { SlotsModule } from './modules/slots/slots.module';
import { AppointmentModule } from './modules/appointment/appointment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HospitalModule,
    DoctorModule,
    SlotsModule,
    AppointmentModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
