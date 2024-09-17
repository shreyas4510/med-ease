import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { Hospital } from '../hospital/hospital.schema';

export type DoctorDocument = HydratedDocument<Doctor>;

@Schema()
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

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: Hospital.name })
  hospital: Hospital;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);
