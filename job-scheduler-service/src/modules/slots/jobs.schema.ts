import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type JobDocument = HydratedDocument<Job>;

@Schema({ timestamps: true })
export class Job {
    @Prop({ required: true, enum: ['PRE', 'POST', 'BOOK'] })
    type: 'PRE' | 'POST' | 'BOOK';

    @Prop({ required: true })
    time: string;

    @Prop({ required: true })
    date: string;

    @Prop({ required: true })
    appointmentId: string;

    @Prop({ required: true })
    message: string;

    @Prop({ required: true })
    contact: string;

    @Prop({ default: Date.now })
    createdAt?: Date;
}

export const JobSchema = SchemaFactory.createForClass(Job);
