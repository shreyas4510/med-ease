import { ReactNode } from "react";

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

export interface hospitalStateType {
    data: {};
    list: Array<{
        value: string;
        label: string;
    }>
}

export interface contextStatesType {
    auth: authStateType;
    hospital: hospitalStateType;
}

export interface contextType {
    state: contextStatesType;
    setAuth: React.Dispatch<React.SetStateAction<authStateType>>;
    setHospital: React.Dispatch<React.SetStateAction<hospitalStateType>>;
}

export interface providerProps {
    children: ReactNode;
}
