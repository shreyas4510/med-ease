import { Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { SlotsService } from '../slots/slots.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Slots, SlotsSchema } from '../slots/slots.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slots.name, schema: SlotsSchema }]),
  ],
  providers: [
    KafkaService,
    SlotsService
  ]
})
export class KafkaModule {}
