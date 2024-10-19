import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './modules/kafka/kafka.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SlotsModule } from './modules/slots/slots.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    KafkaModule,
    SlotsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
