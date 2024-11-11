import { BadRequestException, Body, Controller, Get, HttpCode, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { DoctorDto, DoctorListDto, LoginDto, TokenDto } from './doctor.dto';
import { DoctorService } from './doctor.service';
import * as CryptoJS from 'crypto-js';
import { passwordRegex } from 'src/utils/constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { Doctor } from './doctor.schema';

@Controller('doctor')
export class DoctorController {
    private secretKey: string;
    constructor(
        private doctorService: DoctorService
    ) {
        this.secretKey = process.env.CRYPTO_SECRET_KEY;
    }

    @HttpCode(201)
    @Post()
    async save( @Body() body: DoctorDto ): Promise<DoctorDto> {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(body.password, this.secretKey);
            const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!passwordRegex.test(decryptedPassword)) {
              throw new BadRequestException('Password does not meet the required format');
            }
        
            const data = await this.doctorService.save(body);
            return new DoctorDto(data);
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Post('login')
    async login( @Body() body: LoginDto ): Promise<TokenDto> {
        try {
            const decryptedBytes = CryptoJS.AES.decrypt(body.password, this.secretKey);
            const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

            if (!passwordRegex.test(decryptedPassword)) {
              throw new BadRequestException('Invalid password');
            }
        
            const data = await this.doctorService.login(body, decryptedPassword);
            return data;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Put()
    async managerDoctor(
        @Body() body: Record<string, string>,
        @Request() req
    ): Promise<Record<string, string>> {
        try {
            const doctorId = body.doctor;
            const action = body.action;
            const hospitalId = req.user._id;

            await this.doctorService.manageDoctor({
                doctorId, action, hospitalId
            });
            return {
                message: 'Success'
            };
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get('/unmapped')
    async getDoctorsList( @Query() query: Record<string, string> ): Promise<DoctorListDto[]> {
        try {
            const email = query.email;
            const data = await this.doctorService.getUnmappedDoctors(email);
            return data;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @UseGuards(AuthGuard)
    @Get('/:department')
    async getDoctorsByDepartment( @Request() req, @Param() params: Record<string, string> ): Promise<DoctorDto[]> {
        try {
            const hospitalId = req.user._id;
            const deptName = params.department
            const data = await this.doctorService.getDoctorsByDepartment(deptName, hospitalId);
            return data;
        } catch (error) {
            throw error;
        }
    }

    @HttpCode(200)
    @Post('/list')
    async getDoctorsListByDepartment( @Body() body: Record<string, string> ): Promise<DoctorDto[]> {
        try {
            const hospitalId = body.hospitalId;
            const deptName = body.department
            const data = await this.doctorService.getDoctorsByDepartment(deptName, hospitalId);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
