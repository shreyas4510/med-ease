import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentNotificationDto } from './message.dto';
import { Twilio } from 'twilio';
import * as sgMail from "@sendgrid/mail";
import { InjectModel } from '@nestjs/mongoose';
import { Notification } from './message.schema';
import { Model } from 'mongoose';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class MessageService {
    private twilioSid: string;
    private twilioAuthToken: string;
    private twilioWhatsappNumber: string;

    constructor(
        @InjectModel(Notification.name) private notificationModel: Model<Notification>,
        @Inject(forwardRef(() => KafkaService)) private kafkaService: KafkaService
    ) {
        this.twilioSid = process.env.TWILIO_SID;
        this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
        this.twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendWhatsappMessage(notificationData: AppointmentNotificationDto, notification: Notification): Promise<void> {
        const whastappClient = new Twilio(
            this.twilioSid,
            this.twilioAuthToken
        );

        try {
            await whastappClient.messages.create({
                from: `whatsapp:${this.twilioWhatsappNumber}`,
                to: `whatsapp:+91${notificationData.patientContact}`,
                body: notificationData.message
            });
            console.log(`WhatsApp message sent to ${notificationData.patientContact}`);
            notification.whatsapp = 'SUCCESS';
        } catch (error) {
            console.error(`Error sending WhatsApp message to ${notificationData.patientContact}:`, error.message);
            notification.whatsapp = 'FAILED';
            throw error;
        }
    }

    async sendEmail(notificationData: AppointmentNotificationDto, notification: Notification): Promise<void> {
        if (notificationData.type === 'POST') {
            notificationData.message = 'Thank you for visiting! We hope you had a great experience'
        }

        const msg = {
            to: notificationData.patientEmail,
            from: process.env.SENDER_EMAIL,
            subject: `Med Ease service mail`,
            text: notificationData.message
        };

        try {
            await sgMail.send(msg);
            console.log(`Appointment confirmation email sent to ${notificationData.patientEmail}`);
            notification.email = 'SUCCESS';
        } catch (error) {
            console.error(`Error sending email to ${notificationData.patientEmail}:`, error.message);
            notification.email = 'FAILED';
            throw new Error('Failed to send email notification');
        }
    }

    async sendMessage(payload: AppointmentNotificationDto) {
        try {
            const notification = new this.notificationModel({
                appointmentId: payload.appointmentId,
                doctorId: payload.doctorId,
                type: payload.type,
                patientId: payload.patientId,
                patientContact: payload.patientContact
            });

            await Promise.all([
                this.sendWhatsappMessage(payload, notification),
                this.sendEmail(payload, notification)
            ])
            await notification.save();
        } catch (error) {
            console.error('Error while sending message', error.message);
            throw error;
        }
    }

    async processWebhook(patientContact: string, rating: string) {
        try {
            const notification = await this.notificationModel
                .findOne({ patientContact, type: 'POST' })
                .sort({ createdAt: -1 })
                .limit(1)
                .exec();

            if (!notification) {
                throw new NotFoundException(`Notification not found for this patient contact ${patientContact}`);
            }

            const {
                doctorId,
                patientId,
                appointmentId
            } = notification;
            await this.kafkaService.sendMessage(
                process.env.KAFKA_USER_SERVICE_TOPIC,
                JSON.stringify({
                    doctorId,
                    patientId,
                    appointmentId,
                    rating
                })
            );
        } catch (error) {
            console.error('Failed to process the webhook', error.message);
            throw error;
        }
    }
}
