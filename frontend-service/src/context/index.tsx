import React, { createContext, useContext, useState } from 'react';
import { authStateType, authView, calendarDetails, contextType, departmentStateType, doctorsStateType, hospitalOptionsType, providerProps } from './types';

const Context = createContext<contextType | undefined>(undefined);

const Provider: React.FC<providerProps> = ({ children }) => {
    const [auth, setAuth] = useState<authStateType>({ view: authView.landingPage });
    const [hospital, setHospital] = useState<hospitalOptionsType>({
        departments: [],
        options: [],
        hospitalData: [],
        doctors: [],
        slots: []
    });
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
        removeDoctorModal: false,
        doctorId: '',
        unmappedDoctors: []
    });

    const [calendarDetails, setCalendarDetails] = useState<calendarDetails>({
        addSlots: false,
        endDate: null,
        endTime: null,
        removeSlots: false,
        selectedDays: new Set(),
        startDate: null,
        startTime: null,
        events: []
    })

    const state = { auth, hospital, loginState, departmentState, doctors, calendarDetails };

    return (
        <Context.Provider value={{
            state,
            setAuth,
            setHospital,
            setLoginState,
            setDepartmentState,
            setDoctors,
            setCalendarDetails
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
