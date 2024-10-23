import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorDto, LoginDto, TokenDto } from './doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './doctor.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class DoctorService {
    private secretKey: string;
    constructor(
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        private jwtService: JwtService
    ) {
        this.secretKey = process.env.CRYPTO_SECRET_KEY;
    }

    async save( payload: DoctorDto ): Promise<Doctor> {
        try {
            const doctor = new this.doctorModel(payload);
            return doctor.save();
        } catch (error) {
            throw error;
        }
    }

    async login( payload: LoginDto, decryptedPassword: string ): Promise<TokenDto> {
        try {
            const doctor = await this.doctorModel.findOne({
                email: payload.email
            }).exec();

            if (!doctor) {
                throw new NotFoundException(`Doctor with credentials not found`);
            }
            const data = doctor.toJSON();
            const decryptedBytes = CryptoJS.AES.decrypt(data.password, this.secretKey);
            const userPass = decryptedBytes.toString(CryptoJS.enc.Utf8);
            if (userPass !== decryptedPassword) {
                throw new NotFoundException(`Invalid Password`);                
            }

            delete data.password;
            const token = await this.jwtService.signAsync(data);
            return { token };
        } catch (error) {
            throw error;
        }
    }
}
