import { Injectable } from '@nestjs/common';
import { SlotsDto } from './slots.dto';
import { KafkaService } from '../kafka/kafka.service';

@Injectable()
export class SlotsService {
    constructor( private kafkaService: KafkaService ) {}

    async create( payload: SlotsDto, user ): Promise<Record<string, string>> {
        try {
            await this.kafkaService.sendMessage(
                process.env.KAFKA_USER_TOPIC,
                JSON.stringify({
                    operation: 'CREATE',
                    data: {
                        ...payload,
                        doctor: user._id,
                        hospital: user.hospital
                    }
                })
            )
    
            return {
                "status": "processing",
                "message": "Slots are currently being prepared. Please wait."
            };                
        } catch (error) {
            throw error;
        }
    }
}
