import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as CryptoJs from "crypto-js";
import Doctor from "../assets/images/doctor.png";
import { useContext } from "../context";
import { authView } from "../context/types";
import Button from "../components/button";
import AuthView from "../components/authView";
import { registerHospitalSchema, registerHospitalValues } from "../validations/registerHospital.validation";
import { registerDoctorSchema, registerDoctorValues } from "../validations/registerDoctor.validation";
import { loginSchema, loginValues } from "../validations/login.validations";
import { useNavigate } from "react-router-dom";
import { bookAppointment, getAvailableSlots, getDoctorListByDepartment, getHospitalsList, login, registerDoctor, registerHospital } from "../api";
import moment from "moment";
import bookAppointmentSchema from "../validations/bookAppointment.validation";

const LandingPage = () => {
  const navigate = useNavigate();
  const { state, setAuth, setHospital, setLoginState } = useContext();
  const [ bookAppointmentFormData, setBookAppointmentFormData ] = useState<Record<string, string>>({
    name: '',
    age: '',
    contact: '',
    email: '',
    city: '',
    hospital: '',
    speciality: '',
    doctor: '',
    appointmentDate: '',
    slot: ''
  });

  const handleReset = () => {
    setAuth((prev) => ({ ...prev, view: authView.landingPage }))
  }

  const onHospitalSearch = async (search: string = '') => {
    const res = await getHospitalsList(search);
    if (res) {
      setHospital({
        options: [...res.map(({ _id, name }: Record<string, string>) => ({ label: name, value: _id }))],
        departments: [],
        doctors: [],
        slots: [],
        hospitalData: res
      });
    }
  }

  useEffect(() => {
    onHospitalSearch();
  }, [])

  const BookAppointment = () => {

    const onHospitalSelect = async (id: string, values: Record<string, string>) => {
      const hospitalData = state.hospital.hospitalData.find(({ _id }) => (_id === id));
      setHospital((prev) => {
        return {
          ...prev,
          departments: [ ...(hospitalData?.departments as Array<string>).map((name) => ({ label: name, value: name })) ]
        };
      });
      setBookAppointmentFormData(() => ({
        ...values,
        hospital: id
      }));
    }
  
    const onSpecialitySelect = async (id: string, values: Record<string, string>) => {
      const res = await getDoctorListByDepartment({ hospitalId: values.hospital, department: id });
      if (res) {
        setHospital((prev) => {
          return {
            ...prev,
            doctors: [ ...res.map(({ id, name }: Record<string, string>) => ({ label: name, value: id })) ]
          };
        });
      }
      setBookAppointmentFormData(() => ({
        ...values,
        speciality: id
      }));
    }
  
    const onDateChange = async (id: string, values: Record<string, string>) => {
      if (!(values.hospital && values.doctor)) {
        toast.error('Fill in all details and choose the date again');
        return;
      }

      const date = moment(id).format('DD-MM-YYYY');
      const res = await getAvailableSlots({
        startDate: date,
        endDate: date,
        doctor: values.doctor,
        hospital: values.hospital,
        available: true
      });
  
      if (res) {
        setHospital((prev) => {
          return {
            ...prev,
            slots: [ ...res.map(({ _id, startTime, endTime }: Record<string, string>) => ({
              label: `${startTime}-${endTime}`,
              value: _id
            })) ]
          };
        });
      }

      setBookAppointmentFormData(() => ({
        ...values,
        appointmentDate: id
      }));
    }

    const handleSubmit = async ( values: Record<string, string> ) => {
      const res = await bookAppointment({
        ...values,
        appointmentDate: moment(values.appointmentDate).format('DD-MM-YYYY')
      });
      if (res) {
        setBookAppointmentFormData({
          name: '',
          age: '',
          contact: '',
          email: '',
          city: '',
          hospital: '',
          speciality: '',
          doctor: '',
          appointmentDate: '',
          slot: ''
        })
        setAuth((prev) => ({ ...prev, view: authView.landingPage }));
        toast.success('Thank you! You will be notified on appointment status');
      }
    }

    return (
      <AuthView
        key={`book-appointment-key`}
        title="Book Appointment"
        top={'top-8'}
        handleReset={handleReset}
        initialValues={bookAppointmentFormData}
        validationSchema={bookAppointmentSchema}
        handleSubmit={handleSubmit}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Age', name: 'age', className: 'col-span-1 flex flex-col', type: 'number' },
          { label: 'Email', name: 'email', className: 'col-span-1 flex flex-col', type: 'email' },
          { label: 'Contact', name: 'contact', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'City', name: 'city', className: 'col-span-1 flex flex-col', type: 'text' },
          {
            label: 'Hospital',
            name: 'hospital',
            className: 'col-span-1 flex flex-col',
            type: 'select',
            isSearchable: true,
            options: [...state.hospital.options],
            onSearch: onHospitalSearch,
            onChange: onHospitalSelect
          },
          {
            label: 'Speciality',
            name: 'speciality',
            className: 'col-span-1 flex flex-col',
            type: 'select',
            options: state.hospital.departments,
            onChange: onSpecialitySelect
          },
          {
            label: 'Doctor',
            name: 'doctor',
            className: 'col-span-1 flex flex-col',
            type: 'select',
            options: state.hospital.doctors
          },
          {
            label: 'Appointment Date',
            name: 'appointmentDate',
            className: 'col-span-1 flex flex-col',
            type: 'date',
            onChange: onDateChange
          },
          {
            label: 'Slots',
            name: 'slot',
            className: 'col-span-1 flex flex-col',
            type: 'select',
            isSearchable: true,
            options: [...state.hospital.slots ],
          },
        ]}
      />
    )
  }

  const RegisterHospital = () => {
    const handleSubmit = async (values: Record<string, string>) => {
      const encrypted = CryptoJs.AES.encrypt(
        values.password,
        process.env.REACT_APP_CRYPTO_SECRET_KEY as string
      ).toString();

      const data = { ...values };
      delete data.cpassword;
      data.password = encrypted;

      const res = await registerHospital(data);
      if (res) {
        toast.success('Hospital resgistered successfully !');
        setAuth((prev) => ({ ...prev, view: authView.login }));
      }
    }

    return (
      <AuthView
        key={`register-hospital-key`}
        title="Register Hospital"
        top={'top-12'}
        handleReset={handleReset}
        validationSchema={registerHospitalSchema}
        handleSubmit={handleSubmit}
        initialValues={registerHospitalValues}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Email', name: 'email', className: 'col-span-1 flex flex-col', type: 'email' },
          { label: 'Password', name: 'password', className: 'col-span-1 flex flex-col', type: 'password' },
          { label: 'Confirm Password', name: 'cpassword', className: 'col-span-1 flex flex-col', type: 'password' },
          { label: 'Customer Care Number', name: 'customerCareNumber', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'State', name: 'state', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'City', name: 'city', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Zipcode', name: 'zipCode', className: 'col-span-2 flex flex-col', type: 'text' },
        ]}
      />
    )
  }

  const RegisterDoctor = () => {
    const handleSubmit = async (values: Record<string, string>) => {
      const encrypted = CryptoJs.AES.encrypt(
        values.password,
        process.env.REACT_APP_CRYPTO_SECRET_KEY as string
      ).toString();

      const data = { ...values };
      delete data.cpassword;
      data.password = encrypted;

      const res = await registerDoctor(data);
      if (res) {
        setAuth((prev) => ({ ...prev, view: authView.login }));
        toast.success('Doctor onboarded successfully !')
      }
    }

    return (
      <AuthView
        key={`register-doctor-key`}
        title="Register Doctor"
        top={'top-8'}
        handleReset={handleReset}
        validationSchema={registerDoctorSchema}
        initialValues={registerDoctorValues}
        handleSubmit={handleSubmit}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Email', name: 'email', className: 'col-span-1 flex flex-col', type: 'email' },
          { label: 'Password', name: 'password', className: 'col-span-1 flex flex-col', type: 'password' },
          { label: 'Confirm Password', name: 'cpassword', className: 'col-span-1 flex flex-col', type: 'password' },
          {
            label: 'Hospital',
            name: 'hospital',
            className: 'col-span-2 flex flex-col',
            type: 'select',
            isSearchable: true,
            options: state.hospital.options,
            onSearch: onHospitalSearch
          },
          { label: 'Experience', name: 'experience', className: 'col-span-2 flex flex-col', type: 'number' },
          { label: 'Speciality', name: 'speciality', className: 'col-span-2 flex flex-col', type: 'text' },
        ]}
      />
    )
  }

  const Login = () => {

    const handleSubmit = async (values: Record<string, string>) => {
      let url = process.env.REACT_APP_BASE_URL as string;
      const encrypted = CryptoJs.AES.encrypt(
        values.password,
        process.env.REACT_APP_CRYPTO_SECRET_KEY as string
      ).toString();

      const res = await login(
        { ...values, password: encrypted },
        state.loginState.toLowerCase()
      );

      if (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('type', state.loginState);
        navigate('/main');
      }
    }

    const handleLoginState = (value: string) => {
      setLoginState(value);
    }

    return (
      <>
        <AuthView
          key={`sign-in-key`}
          title="Sign In"
          top={'top-20'}
          handleReset={handleReset}
          initialValues={loginValues}
          validationSchema={loginSchema}
          handleSubmit={handleSubmit}
          handleLoginState={handleLoginState}
          loginState={state.loginState}
          formData={[
            { label: 'Email', name: 'email', className: 'col-span-2 flex flex-col', type: 'email' },
            { label: 'Password', name: 'password', className: 'col-span-2 flex flex-col', type: 'password' },
          ]}
        />
      </>
    )
  }

  const Home = () => {
    return (
      <>
        <div className="grid grid-cols-2 bg-custom-gradient">
          <div className="px-16 my-5 text-start font-poppins text-3xl text-white">MedEase</div>
          <div className="flex items-center justify-end w-full">
            <Button
              className="text-white bg-blue-500" onClick={() => {
                setAuth((prev) => ({ ...prev, view: authView.login }))
              }}
            >Sign In</Button>
            <Button
              className="mx-4 text-white bg-blue-500"
              onClick={() => {
                setAuth((prev) => ({ ...prev, view: authView.registerDoctor }))
              }}
            >Sign Up</Button>
          </div>
        </div>
        <div className="grid grid-cols-2 bg-custom-gradient">
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-4xl md:text-7xl mt-4 max-w-md mx-auto text-white font-poppins">Booking</h1>
            <h1 className="font-bold text-4xl md:text-7xl mt-4 max-w-md mx-auto text-white font-poppins">Appointments</h1>
            <h1 className="font-bold text-4xl md:text-7xl mt-4 max-w-md mx-auto text-white font-poppins">Made Easy</h1>
          </div>
          <div className="flex justify-center">
            <img alt="" src={Doctor} draggable="false" />
          </div>
        </div>
        <Button
          className="mt-16 mx-4 text-white bg-blue-500"
          onClick={() => {
            setAuth((prev) => ({ ...prev, view: authView.registerHospital }))
          }}
        >Register Hospital</Button>
        <Button
          className="mt-16 mx-4 text-white bg-blue-500"
          onClick={() => {
            setAuth((prev) => ({ ...prev, view: authView.bookAppointment }))
          }}
        >Book Appointment</Button>
      </>
    )
  }

  const TabView = () => {
    switch (state.auth.view) {
      case authView.landingPage:
        return <Home />;
      case authView.registerDoctor:
        return <RegisterDoctor />;
      case authView.registerHospital:
        return <RegisterHospital />;
      case authView.login:
        return <Login />;
      case authView.bookAppointment:
        return <BookAppointment />;
      default:
        return <></>;
    }
  }

  return (
    <>{TabView()}</>
  )
}

export default LandingPage;
