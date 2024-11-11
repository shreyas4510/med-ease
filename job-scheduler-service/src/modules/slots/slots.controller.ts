import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { SlotsDto } from './slots.dto';
import { SlotsService } from './slots.service';
import { SlotsDocument } from './slots.schema';
import { AuthGuard } from '../../auth/auth.guard';

@Controller('slots')
export class SlotsController {
    constructor(
        private slotService: SlotsService
    ) {}

    @UseGuards(AuthGuard)
    @HttpCode(200)
    @Post()
    async getSlots( @Body() payload: Partial<SlotsDto> ): Promise<Array<SlotsDocument>> {
        try {
            const data = this.slotService.getSlots(payload);
            return data;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Post('/available')
    async getAvailableSlots( @Body() payload: Partial<SlotsDto> ): Promise<Array<SlotsDocument>> {
        try {
            const data = this.slotService.getSlots(payload);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
