import { Injectable } from '@nestjs/common';
import { CreateSlotsDto } from './slots.dto';
import { KafkaService } from '../kafka/kafka.service';
import { HttpService } from "@nestjs/axios";
@Injectable()
export class SlotsService {
    constructor(
        private kafkaService: KafkaService,
        private http: HttpService
    ) { }

    async create(payload: CreateSlotsDto, user): Promise<Record<string, string>> {
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

    async remove(payload, user): Promise<Record<string, string>> {
        try {
            await this.kafkaService.sendMessage(
                process.env.KAFKA_USER_TOPIC,
                JSON.stringify({
                    operation: 'REMOVE',
                    data: {
                        ...payload,
                        doctor: user._id,
                        hospital: user.hospital
                    }
                })
            )

            return {
                "status": "processing",
                "message": "Slots are currently being removed. Please wait."
            };
        } catch (error) {
            throw error;
        }
    }

    async get(payload, user): Promise<Array<Record<string, string>>> {
        try {
            const body = {
                ...payload,
                hospital: user.hospital,
                doctor: user._id
            };
            const res = await this.http.post(
                process.env.JOB_SCHEDULER_BASE_URL,
                body,
                {
                    headers: {
                        apiKey: process.env.JOB_SCHEDULER_API_KEY
                    }
                }
            ).toPromise();
            return res.data;
        } catch (error) {
            throw error;
        }
    }
}
