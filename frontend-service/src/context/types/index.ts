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

export interface contextStatesType {
    auth: authStateType;
}

export interface contextType {
    state: contextStatesType;
    setAuth: React.Dispatch<React.SetStateAction<authStateType>>;
}

export interface providerProps {
    children: ReactNode;
}
