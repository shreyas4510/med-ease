import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Hospital } from '../hospital/hospital.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema({ timestamps: true })
export class Doctor {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  experience: number;

  @Prop()
  speciality: string;

  @Prop({ default: 0 })
  patientServed: number;

  @Prop({ default: 0 })
  rating: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Hospital.name })
  hospital: Hospital;

  @Prop()
  onBoarded: Date;

  @Prop()
  createdAt?: Date

  @Prop()
  updatedAt?: Date
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);

DoctorSchema.index({
  email: 1
}, { unique: true });