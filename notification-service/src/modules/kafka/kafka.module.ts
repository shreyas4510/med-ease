import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MessageService } from '../message/message.service';

@Module({
  providers: [
    KafkaService,
    MessageService
  ]
})
export class KafkaModule {}
