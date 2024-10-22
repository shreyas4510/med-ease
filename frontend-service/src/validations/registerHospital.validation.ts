import * as yup from 'yup';

export const registerHospitalValues = {
    name: '',
    customerCareNumber: '',
    state: '',
    city: '',
    zipCode: '',
    email: '',
    password: '',
    cpassword: ''
}

export const registerHospitalSchema: yup.Schema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .max(100, 'Name must be at most 100 characters long'),
    
    customerCareNumber: yup.string()
        .required('Customer care number is required')
        .matches(/^\+\d{2}-\d{10}$/, 'Customer care number must be in the format: +91-xxxxxxxxxx'),

    state: yup.string()
        .required('State is required')
        .max(50, 'State must be at most 50 characters long'),
    
    city: yup.string()
        .required('City is required')
        .max(50, 'City must be at most 50 characters long'),
    
    zipCode: yup.string()
        .required('Zip code is required')
        .matches(/^\d{6}$/, 'Zip code must be exactly 6 digits long'),
    
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    
    password: yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-zA-Z]/, 'Password must contain at least one letter')
        .matches(/\d/, 'Password must contain at least one number')
        .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character'),

    cpassword: yup.string()
        .required('Confirm password is required')
        .oneOf([yup.ref('password')], 'Passwords must match')
});
