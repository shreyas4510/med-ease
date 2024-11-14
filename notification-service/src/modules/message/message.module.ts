import { forwardRef, Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './message.schema';
import { KafkaService } from '../kafka/kafka.service';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema }
    ]),
    forwardRef(() => KafkaModule),
  ],
  providers: [
    MessageService,
    KafkaService
  ],
  controllers: [MessageController],
  exports: [MessageService]
})
export class MessageModule {}
