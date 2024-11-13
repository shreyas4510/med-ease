import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class QueueService {
    constructor(
        @InjectQueue('med-ease-jobs') private jobsQueue: Queue
    ) {}

    async addJob(data: Record<string, string>, delay: number) {
        await this.jobsQueue.add(
            'appointment-book-job',
            data,
            { delay }
        );
    }
}
