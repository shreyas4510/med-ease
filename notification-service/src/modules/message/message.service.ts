import { Injectable } from '@nestjs/common';
import { AppointmentNotificationDto } from './message.dto';
import { Twilio } from 'twilio';
import * as sgMail from "@sendgrid/mail";
import { from } from 'rxjs';

@Injectable()
export class MessageService {
    private twilioSid: string;
    private twilioAuthToken: string;
    private twilioWhatsappNumber: string;

    constructor() {
        this.twilioSid = process.env.TWILIO_SID;
        this.twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
        this.twilioWhatsappNumber = process.env.TWILIO_WHATSAPP_NUMBER;

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    }

    async sendWhatsappMessage(notificationData: AppointmentNotificationDto): Promise<void> {
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
        } catch (error) {
            console.error(`Error sending WhatsApp message to ${notificationData.patientContact}:`, error);
            throw error;
        }
    }

    async sendEmail(notificationData: AppointmentNotificationDto): Promise<void> {
        const msg = {
            to: notificationData.patientEmail,
            from: process.env.SENDER_EMAIL,
            subject: `Med Ease service mail`,
            text: notificationData.message
        };

        try {
            await sgMail.send(msg);
            console.log(`Appointment confirmation email sent to ${notificationData.patientEmail}`);
        } catch (error) {
            console.error(`Error sending email to ${notificationData.patientEmail}:`, error);
            throw new Error('Failed to send email notification');
        }
    }

    async sendMessage(payload: AppointmentNotificationDto) {
        try {
            await Promise.all([
                this.sendWhatsappMessage(payload),
                this.sendEmail(payload)
            ])
        } catch (error) {
            console.error('Error while sending message', error);
            throw error;
        }
    }
}
