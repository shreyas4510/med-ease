import React, { createContext, useContext, useState } from 'react';
import { authStateType, authView, contextType, providerProps } from './types';

const Context = createContext<contextType | undefined>(undefined);

const Provider: React.FC<providerProps> = ({ children }) => {
    const [auth, setAuth] = useState<authStateType>({ view: authView.landingPage });
    const state = { auth };

    return (
        <Context.Provider value={{
            state,
            setAuth
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
