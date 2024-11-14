import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema({ timestamps: true })
export class Patient {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    age: number;

    @Prop({ required: true })
    contact: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    city: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
PatientSchema.index({
    email: 1,
}, { unique: true });



export type AppointmentDocument = HydratedDocument<Appointment>;
@Schema({ timestamps: true })
export class Appointment {
    @Prop({ required: true })
    patientId: string;

    @Prop({ required: true })
    doctorId: string;

    @Prop({ required: true })
    hospitalId: string;

    @Prop({ required: true })
    appointmentDate: string;

    @Prop({ required: true })
    slot: string;

    @Prop({ default: 'PENDING' })
    status: string;

    @Prop({ default: Date.now })
    createdAt?: Date;

    @Prop({ default: Date.now })
    updatedAt?: Date;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
