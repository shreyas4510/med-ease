import { IsNotEmpty, IsString } from "class-validator";
import { Doctor } from "./doctor.schema";
export class DoctorDto {
    @IsString()
    id: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    experience: number;

    @IsNotEmpty()
    hospital: string;

    @IsNotEmpty()
    speciality: string;

    @IsNotEmpty()
    patientServed: number;

    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    onBoarded: Date;

    @IsString()
    createdAt: Date;

    constructor(data: Doctor = {
        name: "",
        email: "",
        password: "",
        experience: 0,
        speciality: "",
        createdAt: new Date(),
        patientServed: 0,
        rating: 0,
        onBoarded: new Date(),
        hospital: {
            name: "",
            customerCareNumber: "",
            state: "",
            city: "",
            zipCode: 0,
            email: "",
            password: "",
            departments: []
        }
    }) {
        this.id = (data as any)._id || '';
        this.name = data.name;
        this.email = data.email;
        this.experience = data.experience;
        this.speciality = data.speciality;
        this.createdAt = data.createdAt;
        this.patientServed = data.patientServed;
        this.rating = data.rating;
        this.onBoarded = data.onBoarded;
    }
}

export class LoginDto {
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}

export class TokenDto {
    token: string;
}

export class DoctorListDto {
    id: string;
    email: string;
}
