import { BadRequestException, Body, Controller, HttpCode, Post } from '@nestjs/common';
import { DoctorDto, LoginDto, TokenDto } from './doctor.dto';
import { DoctorService } from './doctor.service';
import * as CryptoJS from 'crypto-js';
import { passwordRegex } from 'src/utils/constants';

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
    @Post()
    async login( @Body() body: LoginDto ): Promise<TokenDto> {
        try {
            const data = await this.doctorService.login(body);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
