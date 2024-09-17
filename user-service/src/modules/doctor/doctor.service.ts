import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorDto, LoginDto, TokenDto } from './doctor.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Doctor } from './doctor.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class DoctorService {
    constructor(
        @InjectModel(Doctor.name) private doctorModel: Model<Doctor>,
        private jwtService: JwtService
    ) {}

    async save( payload: DoctorDto ): Promise<Doctor> {
        try {
            const doctor = new this.doctorModel(payload);
            return doctor.save();
        } catch (error) {
            throw error;
        }
    }

    async login( payload: LoginDto ): Promise<TokenDto> {
        try {
            const doctor = await this.doctorModel.findOne({
                email: payload.email,
                password: payload.password
            }).exec();

            if (!doctor) {
                throw new NotFoundException(`Doctor with credentials not found`);
            }
            const data = doctor.toJSON();
            delete data.password;
            const token = await this.jwtService.signAsync(data);
            return { token };
        } catch (error) {
            throw error;
        }
    }
}
