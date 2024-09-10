import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type HospitalDocument = HydratedDocument<Hospital>;

@Schema()
export class Hospital {
  @Prop()
  name: string;

  @Prop()
  customerCareNumber: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: number;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop([String])
  departments: string[];
}

export const HospitalSchema = SchemaFactory.createForClass(Hospital);
