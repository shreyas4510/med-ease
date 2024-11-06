import React, { ReactNode } from "react";

export enum authView {
    landingPage = 'LANDING_PAGE',
    registerHospital = 'REGISTER_HOSPITAL',
    registerDoctor = 'REGISTER_DOCTOR',
    login = 'LOGIN',
    bookAppointment = 'BOOK_APPOINTMENT'
}

export interface authStateType {
    view: authView
}

export interface hospitalOptionsType {
    value: string;
    label: string;
}

export interface departmentStateType {
    addDeptModal: boolean;
    removeDept: string;
    deptName: string;
    departments: Array<string>;
}

interface doctorDetails {
    id: string;
    name: string;
    email: string;
    experience: number;
    speciality: string;
    createdAt: string;
    patientServed: number;
    rating: number; 
    onBoarded: string;
}
export interface doctorsStateType {
    doctors: doctorDetails[];
    addDoctorModal: boolean;
    doctorId: string;
    unmappedDoctors: Array<{
        label: string;
        value: string;
    }>;
}

export interface contextStatesType {
    auth: authStateType;
    hospital: Array<hospitalOptionsType>;
    loginState: string;
    departmentState: departmentStateType;
    doctors: doctorsStateType
}

export interface contextType {
    state: contextStatesType;
    setAuth: React.Dispatch<React.SetStateAction<authStateType>>;
    setHospital: React.Dispatch<React.SetStateAction<hospitalOptionsType[]>>;
    setLoginState: React.Dispatch<React.SetStateAction<string>>;
    setDepartmentState:  React.Dispatch<React.SetStateAction<departmentStateType>>;
    setDoctors: React.Dispatch<React.SetStateAction<doctorsStateType>>;
}

export interface providerProps {
    children: ReactNode;
}
