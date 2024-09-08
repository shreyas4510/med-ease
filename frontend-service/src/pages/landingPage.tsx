import Button from "../components/button";
import Doctor from "../assets/images/doctor.png";
import { useContext } from "../context";
import { authView } from "../context/types";
import AuthView from "../components/authView";

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
          { label: 'Name', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Age', className: 'col-span-1 flex flex-col', type: 'number' },
          { label: 'Contact', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'City', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Doctor', className: 'col-span-1 flex flex-col', type: 'text' },
          { label: 'Appointment Date', className: 'col-span-1 flex flex-col', type: 'text' }
        ]}
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
          { label: 'Name', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Customer Care Number', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'City', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'State', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Zipcode', className: 'col-span-2 flex flex-col', type: 'text' },
        ]}
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
          { label: 'Name', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Experience', className: 'col-span-2 flex flex-col', type: 'number' },
          { label: 'Speciality', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Hospital', className: 'col-span-2 flex flex-col', type: 'text' },

        ]}
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
          { label: 'Doctor Id', className: 'col-span-2 flex flex-col', type: 'text' },
          { label: 'Password', className: 'col-span-2 flex flex-col', type: 'password' },
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
            <img src={Doctor} />
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
