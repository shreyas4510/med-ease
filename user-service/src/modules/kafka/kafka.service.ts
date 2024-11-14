import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { AppointmentService } from '../appointment/appointment.service';

@Injectable()
export class KafkaService {
    private kafka;
    constructor(
        @Inject(forwardRef(() => AppointmentService)) private appointmentService: AppointmentService,
    ) {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [
                process.env.KAFKA_BROKER_URL
            ],
        });
        this.consumeMessages();
    }

    async sendMessage(topic: string, message: string) {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic,
            messages: [{ value: message }],
        });
        await producer.disconnect();
    }

    async processTopic(topic: string, payload) {
        console.log('KAFKA MESSAGE RECEIVED');
        console.log(topic);
        console.log(payload);

        payload = JSON.parse(payload);
        if (topic === process.env.KAFKA_USER_SERVICE_TOPIC) {
            this.appointmentService.processPostAppointment(payload);
        }
    }

    async consumeMessages() {
        const consumer = this.kafka.consumer({
            groupId: process.env.KAFKA_GROUP_ID,
            heartbeatInterval: 10000,
            sessionTimeout: 30000,
        });
        await consumer.connect();
        await consumer.subscribe({ topic: process.env.KAFKA_USER_SERVICE_TOPIC, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                console.log("Here Atleast");
                
                this.processTopic(topic, message.value.toString());
            },
        });
    }
}
