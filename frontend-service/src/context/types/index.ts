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

export interface hospitalOptionsType {
    value: string;
    label: string;
}

export interface contextStatesType {
    auth: authStateType;
    hospital: Array<hospitalOptionsType>;
    loginState: string;
}

export interface contextType {
    state: contextStatesType;
    setAuth: React.Dispatch<React.SetStateAction<authStateType>>;
    setHospital: React.Dispatch<React.SetStateAction<hospitalOptionsType[]>>;
    setLoginState: React.Dispatch<React.SetStateAction<string>>;
}

export interface providerProps {
    children: ReactNode;
}
