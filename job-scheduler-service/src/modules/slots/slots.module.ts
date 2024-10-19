import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Slots, SlotsSchema } from './slots.schema';
import { SlotsService } from './slots.service';
import { SlotsController } from './slots.controller';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MongooseModule.forFeature([{ name: Slots.name, schema: SlotsSchema }]),
    ],
    providers: [SlotsService],
    controllers: [SlotsController],
})
export class SlotsModule { }
