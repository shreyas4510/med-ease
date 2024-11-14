import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { KafkaService } from '../kafka/kafka.service';
import { forwardRef, Inject } from '@nestjs/common';

@Processor('med-ease-jobs')
export class QueueProcessor extends WorkerHost {

    constructor(
        @Inject(forwardRef(() => KafkaService)) private kafkaService: KafkaService
    ) {
        super();
    }

    async process(job: Job): Promise<void> {
        try {
            const { data } = job;
            await this.kafkaService.sendMessage(
                process.env.KAFKA_NOTIFICATION_TOPIC,
                JSON.stringify(data)
            );
        } catch (error) {
            console.error(`Error processing job: ${error.message}`);
            throw error;
        }
    }
}