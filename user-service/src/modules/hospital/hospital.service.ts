import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from './hospital.schema';
import { Model } from 'mongoose';
import { DepartmentDto, HospitalDto, LoginDto, TokenDto } from './hospital.dto';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class HospitalService {
    private secretKey: string;
    constructor(
        @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
        private jwtService: JwtService
    ) {
        this.secretKey = process.env.CRYPTO_SECRET_KEY;
    }

    async save(payload: HospitalDto): Promise<Hospital> {
        try {
            const hospital = new this.hospitalModel(payload);
            return await hospital.save();
        } catch (error) {
            throw error;
        }
    }

    async login(payload: LoginDto, decryptedPassword: string): Promise<TokenDto> {
        try {
            let hospitalData = await this.hospitalModel.findOne({
                email: payload.email
            }).exec();

            if (!hospitalData) {
                throw new NotFoundException(`Hospital with credentials not found`);
            }
            
            const data = hospitalData.toJSON();            
            const decryptedBytes = CryptoJS.AES.decrypt(data.password, this.secretKey);
            const hospitalPass = decryptedBytes.toString(CryptoJS.enc.Utf8);
            if (hospitalPass !== decryptedPassword) {
                throw new NotFoundException(`Invalid Password`);                
            }

            delete data.password;
            const token = await this.jwtService.signAsync(data);
            return { token };
        } catch (error) {
            throw error;
        }
    }

    async addDepartments(hospitalData: HospitalDto, { departments }: DepartmentDto): Promise<void> {
        try {
            const res = await this.hospitalModel.updateOne(
                { _id: hospitalData._id },
                { departments }
            )

            if (!res.modifiedCount) {
                throw new NotFoundException(`Hospital with ID ${hospitalData._id} not found`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async findHospitals(search: string): Promise<Hospital[]> {
        try {
            const searchTerm = new RegExp(search, 'i');
            const res = await this.hospitalModel
                .find({ name: searchTerm })
                .limit(10);
            return res;
        } catch (error) {
            throw error;
        }
    }

    async getHospitalDetails(id: string): Promise<Hospital> {
        try {
            const res = await this.hospitalModel.findOne({ _id: id });
            return res;
        } catch (error) {
            throw error;
        }
    }
}
