import { IsNotEmpty } from "class-validator";
import { Doctor } from "./doctor.schema";
export class DoctorDto {
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

    constructor( data: Doctor = {
        name: "",
        email: "",
        password: "",
        experience: 0,
        speciality: "",
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
        this.name = data.name;
        this.email = data.email;
        this.experience = data.experience;
        this.speciality = data.speciality;
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
