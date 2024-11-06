import React, { createContext, useContext, useState } from 'react';
import { authStateType, authView, contextType, departmentStateType, doctorsStateType, hospitalOptionsType, providerProps } from './types';

const Context = createContext<contextType | undefined>(undefined);

const Provider: React.FC<providerProps> = ({ children }) => {
    const [auth, setAuth] = useState<authStateType>({ view: authView.landingPage });
    const [hospital, setHospital] = useState<hospitalOptionsType[]>([]);
    const [loginState, setLoginState] = useState<string>('hospital');
    const [departmentState, setDepartmentState] = useState<departmentStateType>({
        addDeptModal: false,
        removeDept: '',
        deptName: '',
        departments: []
    });
    const [doctors, setDoctors] = useState<doctorsStateType>({
        doctors: [],
        addDoctorModal: false,
        doctorId: '',
        unmappedDoctors: []
    });

    const state = { auth, hospital, loginState, departmentState, doctors };

    return (
        <Context.Provider value={{
            state,
            setAuth,
            setHospital,
            setLoginState,
            setDepartmentState,
            setDoctors
        }}>
            {children}
        </Context.Provider>
    );
};

const useMyContext = (): contextType => {
    const context = useContext(Context);
    if (context === undefined) {
        throw new Error('useMyContext must be used within a MyProvider');
    }

    return context;
};

export { Context, Provider, useMyContext as useContext };
