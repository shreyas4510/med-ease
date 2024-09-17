import Button from "../components/button";
import Doctor from "../assets/images/doctor.png";
import { useContext } from "../context";
import { authView } from "../context/types";
import AuthView from "../components/authView";

import { object, string, number, date } from 'yup';

const LandingPage = () => {
  const { state, setAuth } = useContext();

  const handleReset = () => {
    setAuth((prev) => ({ ...prev, view: authView.landingPage }))
  }

  const BookAppointment = () => {
    return (
      <AuthView
        key={`book-appointment-key`}
        title="Book Appointment"
        top={'top-8'}
        handleReset={handleReset}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Age', name: 'age', className: 'col-span-1 flex flex-col', type: 'number' },
          { label: 'Contact', name: 'contact', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'City', name: 'city', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Speciality', name: 'speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', name: 'hospital', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Doctor', name: 'doctor', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Appointment Date', name: 'appDate', className: 'col-span-1 flex flex-col', type: 'date' }
        ]}
        validationSchema={ object({
          name: string().required('Name is required'),
          age: number().required('Age is required'),
          contact: string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be exactly 10 digits'),
          city: string().required('City is required'),
          speciality: string().required('Speciality is required'),
          hospital: string().required('Hospital is required'),
          doctor: string().required('Doctor name is reuired'),
          appDate: date().required('Appointment date is required')
        }) }
      />
    )
  }

  const RegisterHospital = () => {
    return (
      <AuthView
        key={`register-hospital-key`}
        title="Register Hospital"
        top={'top-12'}
        handleReset={handleReset}
        formData={[
<<<<<<< HEAD
          { label: 'Name', name: 'name', className: 'col-sp8an-2 flex flex-col', type: 'text' },
          { label: 'Customer Care Number', name: 'cutmCareNum', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'City', name: 'city', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'State', name: 'state', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Zipcode', name: 'zipcode', className: 'col-span-2 flex flex-col', type: 'text' },
=======
          { label: 'Name', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Customer Care Number', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'State', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'City', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Zipcode', className: 'col-span-2 flex flex-col', type: 'text' },
>>>>>>> f155c6a9a716a51ad082c2e39da3b003db7c36f9
        ]}
        validationSchema={ object({
          name: string().required("name is required"),
          cutmCareNum: string().required('Phone number is required').matches(/^\d{10}$/, 'Cutomer care number must be exactly 10 digits'),
          city: string().required("city is required"),
          state: string().required("state is rewuired"),
          zipcode: number().required('zipcode is required')
        }) }
      />
    )
  }

  const RegisterDoctor = () => {
    return (
      <AuthView
        key={`register-doctor-key`}
        title="Register Doctor"
        top={'top-8'}
        handleReset={handleReset}
        formData={[
          { label: 'Name', name:'name', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Experience', name: 'experience', className: 'col-span-2 flex flex-col', type: 'number' },
          { label: 'Speciality', name: 'speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', name: 'hospital', className: 'col-span-2 flex flex-col', type: 'text' },

        ]}
        validationSchema={ object({
          name: string().required("Doctor name is required"),
          experience: number().required("Experience is required").min(0, "experience should be greater than 0"),
          speciality: string().required(" Speciality is required"),
          hospital: string().required("Hospital is required")
        }) }
      />
    )
  }

  const Login = () => {
    return (
      <AuthView
        key={`sign-in-key`}
        title="Sign In"
        top={'top-40'}
        handleReset={handleReset}
        formData={[
          { label: 'Doctor Id', name: 'doctorId', className: 'col-span-2 flex flex-col', type: 'text'},
          { label: 'Password', name: 'password', className: 'col-span-2 flex flex-col', type: 'password' },
        ]}
        validationSchema={ object({
          doctorId: string().required("Doctor Id is required"),
          password: string().min(8, "password should contain more than 8 characters").required('password is required')
        }) }
      />
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
