import { Dayjs } from "dayjs";
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
    removeDoctorModal: boolean;
    doctorId: string;
    unmappedDoctors: Array<{
        label: string;
        value: string;
    }>;
}

export interface calendarDetails {
    addSlots: boolean;
    removeSlots: boolean;
    selectedDays: Set<string>;
    startDate: Dayjs | null;
    endDate: Dayjs | null; 
    startTime: Dayjs | null;
    endTime: Dayjs | null;
    events: Array<object>;
}

export interface contextStatesType {
    auth: authStateType;
    hospital: Array<hospitalOptionsType>;
    loginState: string;
    departmentState: departmentStateType;
    doctors: doctorsStateType,
    calendarDetails: calendarDetails;
}

export interface contextType {
    state: contextStatesType;
    setAuth: React.Dispatch<React.SetStateAction<authStateType>>;
    setHospital: React.Dispatch<React.SetStateAction<hospitalOptionsType[]>>;
    setLoginState: React.Dispatch<React.SetStateAction<string>>;
    setDepartmentState:  React.Dispatch<React.SetStateAction<departmentStateType>>;
    setDoctors: React.Dispatch<React.SetStateAction<doctorsStateType>>;
    setCalendarDetails: React.Dispatch<React.SetStateAction<calendarDetails>>;
}

export interface providerProps {
    children: ReactNode;
}
