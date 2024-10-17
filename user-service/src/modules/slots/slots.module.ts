import { Module } from '@nestjs/common';
import { SlotsController } from './slots.controller';
import { SlotsService } from './slots.service';
import { KafkaService } from '../kafka/kafka.service';

@Module({
  controllers: [SlotsController],
  providers: [
    SlotsService,
    KafkaService
  ]
})
export class SlotsModule {}
