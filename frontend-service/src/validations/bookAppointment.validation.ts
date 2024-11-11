import * as yup from 'yup';

const bookAppointmentSchema = yup.object({
    name: yup.string()
        .required('Name is required')
        .min(2, 'Name should be at least 2 characters'),
    age: yup.number().required('Age is required'),
    contact: yup.string()
        .required('Contact number is required')
        .matches(/^[0-9]{10}$/, 'Contact must be a valid 10-digit number'),
    email: yup.string()
        .required('Email is required')
        .email('Email must be a valid email address'),
    city: yup.string()
        .required('City is required')
        .min(2, 'City should be at least 2 characters'),
    hospital: yup.string().required('Hospital is required'),
    speciality: yup.string().required('Speciality is required'),
    doctor: yup.string().required('Doctor is required'),
    appointmentDate: yup.date()
        .required('Appointment Date is required')
        .min(new Date(), 'Appointment date must be in the future'),
    slots: yup.string().required('Slot is required'),
});

export default bookAppointmentSchema;
