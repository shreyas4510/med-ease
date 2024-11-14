import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ timestamps: true })
export class Notification {

    @Prop({ required: true })
    patientId: string;

    @Prop({ required: true })
    appointmentId: string;

    @Prop({ required: true })
    doctorId: string;

    @Prop({ required: true })
    patientContact: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    whatsapp: string;

    @Prop({ required: true })
    email: string;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
