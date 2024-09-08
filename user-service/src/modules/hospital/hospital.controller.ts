import { Controller, Get } from '@nestjs/common';
import { HospitalService } from './hospital.service';

@Controller('hospital')
export class HospitalController {
    constructor(private readonly hospitalService: HospitalService) {}

    @Get()
    getHello(): string {
        return this.hospitalService.getHello();
    }
}
