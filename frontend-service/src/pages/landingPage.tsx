import Button from "../components/button";
import Doctor from "../assets/images/doctor.png";
import { useContext } from "../context";
import { authView } from "../context/types";
import AuthView from "../components/authView";
import { registerHospitalSchema, registerHospitalValues } from "../validations/registerHospital.validation";

const LandingPage = () => {
  const { state, setAuth } = useContext();

  const handleReset = () => {
    setAuth((prev) => ({ ...prev, view: authView.landingPage }))
  }

  const BookAppointment = () => {

    const handleSubmit = () => {
      // TODO: api integration for book appointment
    }

    return (
      <AuthView
        key={`book-appointment-key`}
        title="Book Appointment"
        top={'top-8'}
        handleReset={handleReset}
        // TODO: add validation schema and initial values for book appointment
        initialValues={{}}
        validationSchema={{} as any}
        handleSubmit={handleSubmit}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Age', name: 'age', className: 'col-span-1 flex flex-col', type: 'number' },
          { label: 'Contact', name: 'contact', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'City', name: 'city', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Speciality', name: 'speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', name: 'hospital', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Doctor', name: 'doctor', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Appointment Date', name: 'appointmentDate', className: 'col-span-1 flex flex-col', type: 'text' }
        ]}
      />
    )
  }

  const RegisterHospital = () => {

    const handleSubmit = () => {
      // TODO: api integration for register hospital
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

    const handleSubmit = () => {
      // TODO: do api integration for register doctor
    }

    return (
      <AuthView
        key={`register-doctor-key`}
        title="Register Doctor"
        top={'top-8'}
        handleReset={handleReset}
        // TODO: update initialValues and validationSchema as required
        initialValues={{}}
        validationSchema={{} as any}
        handleSubmit={handleSubmit}
        formData={[
          { label: 'Name', name: 'name', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Experience', name: 'experience', className: 'col-span-2 flex flex-col', type: 'number' },
          { label: 'Speciality', name: 'speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', name: 'hospital', className: 'col-span-2 flex flex-col', type: 'text' },

        ]}
      />
    )
  }

  const Login = () => {

    const handleSubmit = () => {
      // TODO: do api integration using axios and context api for logging in hospital
    }

    return (
      <AuthView
        key={`sign-in-key`}
        title="Sign In"
        top={'top-40'}
        handleReset={handleReset}
        // TODO: update initialValues and validationSchema as required
        initialValues={{}}
        validationSchema={{} as any}
        handleSubmit={handleSubmit}
        formData={[
          { label: 'Doctor Id', name: 'doctorId', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Password', name: 'password', className: 'col-span-2 flex flex-col', type: 'password' },
        ]}
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
