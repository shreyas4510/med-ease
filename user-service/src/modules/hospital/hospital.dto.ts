import { IsNotEmpty } from "class-validator";
import { Hospital } from "./hospital.schema";

export class HospitalDto {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    customerCareNumber: string;

    @IsNotEmpty()
    state: string;

    @IsNotEmpty()
    city: string;

    @IsNotEmpty()
    zipCode: number;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    departments: string[];
    _id: string;

    constructor(data: Hospital = {
        name: "",
        customerCareNumber: "",
        state: "",
        city: "",
        zipCode: 0,
        email: "",
        password: "",
        departments: []
    }) {        
        this.name = data.name;
        this.customerCareNumber = data.customerCareNumber;
        this.state = data.state;
        this.city = data.city;
        this.zipCode = data.zipCode;
        this.email = data.email;
        this.departments = data.departments;
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

export class DepartmentDto {
    @IsNotEmpty()
    departments: string[]
}
