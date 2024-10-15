import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
    private kafka;
    constructor() {
        this.kafka = new Kafka({
            clientId: process.env.KAFKA_CLIENT_ID,
            brokers: [
                process.env.KAFKA_BROKER_URL
            ],
        });
        this.consumeMessages();
    }

    async consumeMessages() {        
        const consumer = this.kafka.consumer({
            groupId: process.env.KAFKA_GROUP_ID
        });
        await consumer.connect();
        await consumer.subscribe({ topic: process.env.KAFKA_USER_TOPIC, fromBeginning: true });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    topic,
                    partition,
                    value: message.value.toString(),
                });
            },
        });
    }
}
