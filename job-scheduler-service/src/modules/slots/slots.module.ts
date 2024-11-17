import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Slots, SlotsSchema } from './slots.schema';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';
import { Job, JobSchema } from './jobs.schema';
import { QueueModule } from '../queue/queue.module';
import { GatewayService } from '../../gateway/gateway.service';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forFeature([
            { name: Slots.name, schema: SlotsSchema },
            { name: Job.name, schema: JobSchema },
        ]),
        QueueModule,
    ],
    providers: [SlotsService, GatewayService],
    controllers: [SlotsController],
})
export class SlotsModule { }
