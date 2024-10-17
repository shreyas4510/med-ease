import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { KafkaModule } from './modules/kafka/kafka.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    KafkaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
