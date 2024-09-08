import { Injectable } from '@nestjs/common';

@Injectable()
export class HospitalService {
    getHello(): string {
        return 'Hello Shreyas!';
    }
}
