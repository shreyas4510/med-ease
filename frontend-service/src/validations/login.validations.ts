import * as yup from 'yup';

export const loginValues = {
    email: '',
    password: '',
}

export const loginSchema: yup.Schema = yup.object().shape({
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),

    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),
});
