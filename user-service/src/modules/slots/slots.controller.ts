import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { SlotsDto } from './slots.dto';
import { SlotsService } from './slots.service';

@Controller('slots')
export class SlotsController {
    constructor(private slotService: SlotsService) { }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Post()
    async create(@Req() req, @Body() body: SlotsDto): Promise<Record<string, string>> {
        try {
            const res = await this.slotService.create(body, req.user);
            return res;
        } catch (error) {
            throw error;
        }
    }
}
