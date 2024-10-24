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

    async processTopic( topic: string, payload ) {
        payload = JSON.parse(payload);
        switch (topic) {
            case process.env.KAFKA_USER_TOPIC:
                if (payload.operation === 'CREATE') {
                    this.slotService.createSlots(payload.data);
                }
                if (payload.operation === 'REMOVE') {
                    this.slotService.removeSlots(payload.data);
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
