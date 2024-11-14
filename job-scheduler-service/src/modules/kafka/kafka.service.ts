import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { SlotsService } from '../slots/slots.service';

@Injectable()
export class KafkaService {
    private kafka;
    constructor(
        private slotService: SlotsService
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

    async processTopic( topic: string, payload ) {
        console.log('KAFKA MESSAGE RECEIVED');
        console.log(topic);
        console.log(payload);

        payload = JSON.parse(payload);
        switch (topic) {
            case process.env.KAFKA_USER_TOPIC:
                switch (payload.operation) {
                    case 'CREATE':
                        this.slotService.createSlots(payload.data);
                        break;
                    case 'REMOVE':
                        this.slotService.removeSlots(payload.data);
                        break;
                    case 'APPOINTMENT_BOOK':
                        this.slotService.bookAppointment(payload.data);
                        break
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    async consumeMessages() {        
        const consumer = this.kafka.consumer({
            groupId: process.env.KAFKA_GROUP_ID,
            heartbeatInterval: 10000,
            sessionTimeout: 30000,          
        });
        await consumer.connect();
        await consumer.subscribe({ topic: process.env.KAFKA_USER_TOPIC, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, message }) => {
                this.processTopic( topic, message.value.toString() );
            },
        });
    }
}
