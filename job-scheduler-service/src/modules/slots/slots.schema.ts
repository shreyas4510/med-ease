import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type SlotsDocument = HydratedDocument<Slots>;

@Schema({ timestamps: true })
export class Slots {
    @Prop()
    date: string;

    @Prop({ default: '' })
    title: string;

    @Prop()
    startTime: string;

    @Prop()
    endTime: string;

    @Prop()
    status: string;

    @Prop()
    patientId: string;

    @Prop()
    doctorId: string;

    @Prop()
    hospitalId: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date

}

export const SlotsSchema = SchemaFactory.createForClass(Slots);

SlotsSchema.index({
    date: 1,
    startTime: 1,
    endTime: 1,
    status: 1,
    patientId: 1,
    doctorId: 1,
    hospitalId: 1
}, { unique: true });
