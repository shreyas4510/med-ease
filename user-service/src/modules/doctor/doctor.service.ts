import { Injectable, NotFoundException } from '@nestjs/common';
import { DoctorDto, DoctorListDto, LoginDto, TokenDto } from './doctor.dto';
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
            payload.onBoarded = new Date();
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

    async getDoctorsByDepartment( deptName: string, hospitalId: string ): Promise<DoctorDto[]> {
        try {
            const data = this.doctorModel.find({
                speciality: deptName,
                hospital: hospitalId
            });
            const doctors = (await data).map(item => new DoctorDto(item));
            return doctors;
        } catch (error) {
            throw error;
        }
    }

    async manageDoctor({ doctorId, hospitalId, action }): Promise<void> {
        try {
            let query = {};
            if (action.toLowerCase() === 'onboard') {
                query = {
                    hospital: hospitalId,
                    onBoarded: new Date()
                }
            } else {
                query = { hospital: null }
            }

            const res = await this.doctorModel.updateOne(
                { _id: doctorId },
                query
            )

            if (!res.modifiedCount) {
                throw new NotFoundException(`Failed to ${action} doctor please try again.`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async getUnmappedDoctors( searchTerm: string ): Promise<DoctorListDto[]> {
        try {
            const email = new RegExp(searchTerm, 'i');
            const res = await this.doctorModel.find({
                email,
                hospital: null
            }).limit(10)

            if (!res) {
                throw new NotFoundException(`No Unmapped doctor found with email ${email}`);
            }
            return res.map(item => ({ id: item.id, email: item.email }));
        } catch (error) {
            throw error;
        }
    }
}
