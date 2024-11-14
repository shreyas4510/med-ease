import { forwardRef, Module } from '@nestjs/common';
import { KafkaService } from './kafka.service';
import { MessageService } from '../message/message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from '../message/message.schema';
import { MessageModule } from '../message/message.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema }
    ]),
    forwardRef(() => MessageModule)
  ],
  providers: [
    KafkaService,
    MessageService
  ],
  exports: [KafkaService]
})
export class KafkaModule {}
