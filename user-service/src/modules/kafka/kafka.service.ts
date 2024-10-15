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
}
