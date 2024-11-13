import { forwardRef, Module } from '@nestjs/common';
import { QueueService } from './queue.service';
import { BullModule } from '@nestjs/bullmq';
import { QueueProcessor } from './queue.processor';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    BullModule.registerQueue({
      name: 'med-ease-jobs',
      connection: {
        host: 'localhost',
        port: 6379
      },
    }),
    forwardRef(() => KafkaModule)
  ],
  providers: [ QueueService, QueueProcessor ],
  exports: [ QueueService, QueueProcessor ]
})
export class QueueModule {}
