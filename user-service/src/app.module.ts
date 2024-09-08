import { Module } from '@nestjs/common';
import { HospitalModule } from './modules/hospital/hospital.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    HospitalModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
