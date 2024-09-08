import React from 'react';
import { ButtonProps } from './types/button';

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            className={`
                ${ className }
                px-8 py-3
                font-semibold
                rounded
                shadow-xl
                transition-transform
                duration-300
                hover:shadow-xl
                hover:translate-y-[-2px]
                focus:outline-none
                focus:ring-2
                focus:ring-blue-300
            `}>
            {children}
        </button>
    );
};

export default Button;
