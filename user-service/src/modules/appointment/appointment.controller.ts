import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentDto } from './appointment.dto';

@Controller('appointment')
export class AppointmentController {

    constructor( private appointmentService: AppointmentService ) {}

    @HttpCode(200)
    @Post()
    async bookAppointment(@Body() body: CreateAppointmentDto ): Promise<Record<string, string>> {
      try {
        const res = await this.appointmentService.bookAppointment(body);
        return res;
      } catch (error) {
        throw error;
      }
    }
}
