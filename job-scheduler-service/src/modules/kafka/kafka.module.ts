import { forwardRef, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { SlotsService } from '../slots/slots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Slots, SlotsSchema } from '../slots/slots.schema';
import { ConfigModule } from '@nestjs/config';
import { QueueModule } from '../queue/queue.module';
import { Job, JobSchema } from '../slots/jobs.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forFeature([
      { name: Slots.name, schema: SlotsSchema },
      { name: Job.name, schema: JobSchema },
    ]),
    forwardRef(() => QueueModule)
  ],
  providers: [
    KafkaService,
    SlotsService
  ],
  exports: [KafkaService]
})
export class KafkaModule {}
