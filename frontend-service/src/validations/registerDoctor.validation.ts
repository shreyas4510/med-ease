import * as yup from 'yup';

export const registerDoctorValues = {
    name: '',
    email: '',
    password: '',
    cpassword: '',
    experience: '',
    hospital: '',
    speciality: ''
}

export const registerDoctorSchema: yup.Schema = yup.object().shape({
    name: yup.string()
        .required('Name is required')
        .max(100, 'Name must be at most 100 characters long'),

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
        .oneOf([yup.ref('password')], 'Passwords must match'),

    experience: yup.number()
        .required('Experience is required')
        .min(0, 'Experience must be at least 0')
        .max(50, 'Experience must be at most 50'),

    hospital: yup.string()
        .required('Hospital is required')
        .length(24, 'Hospital ID must be exactly 24 characters'),
    
    speciality: yup.string()
        .required('Speciality is required')
        .max(100, 'Speciality must be at most 100 characters')
});
