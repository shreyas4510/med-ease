import { Body, Controller, Delete, Get, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../auth/auth.guard';
import { SlotsDto, CreateSlotsDto } from './slots.dto';
import { SlotsService } from './slots.service';

@Controller('slots')
@UseGuards(AuthGuard)
export class SlotsController {
    constructor(private slotService: SlotsService) { }

    @HttpCode(200)
    @Post()
    async create(@Req() req, @Body() body: CreateSlotsDto): Promise<Record<string, string>> {
        try {
            const res = await this.slotService.create(body, req.user);
            return res;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Delete()
    async remove(@Req() req, @Body() body: SlotsDto): Promise<Record<string, string>> {
        try {
            const res = await this.slotService.remove(body, req.user);
            return res;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Post('get')
    async get(@Req() req, @Body() body: Partial<SlotsDto>): Promise<Array<Record<string, string>>> {
        try {
            const res = await this.slotService.get(body, req.user);
            return res;
        } catch (error) {
            throw error;
        }
    }
}
