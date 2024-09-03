import Button from "../components/button";
import Doctor from "../assets/images/doctor.png";

function LandingPage() {
  return (
    <>
      <div className="grid grid-cols-2 bg-custom-gradient">
        <div className="px-16 my-5 text-start font-poppins text-3xl text-white">MedEase</div>
        <div className="flex items-center justify-end w-full">
          <Button className="text-white bg-blue-500" onClick={() => { }}>Sign In</Button>
          <Button className="mx-4 text-white bg-blue-500">Sign Up</Button>
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
      <Button className="mt-16 text-white bg-blue-500">Book Appointment</Button>
    </>
  )
}

export default LandingPage;
