import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Hospital } from './hospital.schema';
import { Model } from 'mongoose';
import { DepartmentDto, HospitalDto, LoginDto, TokenDto } from './hospital.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HospitalService {
    constructor(
        @InjectModel(Hospital.name) private hospitalModel: Model<Hospital>,
        private jwtService: JwtService
    ) { }

    async save(payload: HospitalDto): Promise<Hospital> {
        try {
            const hospital = new this.hospitalModel(payload);
            return await hospital.save();
        } catch (error) {
            throw error;
        }
    }

    async login(payload: LoginDto): Promise<TokenDto> {
        try {
            let hospitalData = await this.hospitalModel.findOne({
                    email: payload.email,
                    password: payload.password
                }).exec();
            if (!hospitalData) {
                throw new NotFoundException(`Hospital with credentials not found`);
            }

            const data = hospitalData.toJSON();
            delete data.password;     
            const token = await this.jwtService.signAsync(data);
            return { token };
        } catch (error) {
            throw error;
        }
    }

    async addDepartments( hospitalData: HospitalDto, { departments }: DepartmentDto ): Promise<void> {
        try {
            const res = await this.hospitalModel.updateOne(
                { _id: hospitalData._id },
                { departments }
            )

            if(!res.modifiedCount) {
                throw new NotFoundException(`Hospital with ID ${hospitalData._id} not found`);
            }
            return;
        } catch (error) {
            throw error;
        }
    }

    async findHospitals( search: string ): Promise<Array<string>> {
        try {
            const searchTerm = new RegExp(search, 'i');
            const res = await this.hospitalModel.find({ name: searchTerm });
            const data = res.map(item => `${item.name}, ${item.zipCode}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}
