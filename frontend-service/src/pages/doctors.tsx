import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "../components/button";
import { useEffect } from "react";

const doctors = [
    {
        "name": "Dr. john smith",
        "email": "john.smith@example.com",
        "onboarded_on": "2023-01-15",
        "experience": 10,
        "specialty": "cardiology",
        "patients": 150,
        "ratings": 4.8
    },
    {
        "name": "Dr. jane doe",
        "email": "jane.doe@example.com",
        "onboarded_on": "2022-05-10",
        "experience": 8,
        "specialty": "dermatology",
        "patients": 200,
        "ratings": 4.7
    },
    {
        "name": "Dr. emily johnson",
        "email": "emily.johnson@example.com",
        "onboarded_on": "2021-09-25",
        "experience": 5,
        "specialty": "pediatrics",
        "patients": 100,
        "ratings": 4.9
    },
    {
        "name": "Dr. michael brown",
        "email": "michael.brown@example.com",
        "onboarded_on": "2020-11-30",
        "experience": 12,
        "specialty": "orthopedics",
        "patients": 250,
        "ratings": 4.6
    },
    {
        "name": "Dr. sarah wilson",
        "email": "sarah.wilson@example.com",
        "onboarded_on": "2023-03-01",
        "experience": 3,
        "specialty": "general practice",
        "patients": 80,
        "ratings": 4.5
    }
]

const Doctors = () => {

    const handleRemove = () => {
        // TODO: add remove api call here
    }

    useEffect(() => {
        // TODO: take department id from url and fetch list of doctors for this hospital and speciality
    }, [])

    return (
        <div>
            <div className="text-black text-3xl m-8 text-primary font-bold">Doctors</div>
            <div>
                {doctors.map((doctor) => (
                    <Accordion className="my-6 mx-8 !bg-light !shadow-xl" key={doctor.name}>
                        <AccordionSummary>
                            <div className="text-black text-xl font-poppins">{doctor.name}</div>
                        </AccordionSummary>
                        <AccordionDetails className="bg-white font-poppins text-xl flex flex-col mx-5 !p-14">
                            <div className="grid grid-cols-1 md:grid-cols-2 mx-5">
                                {
                                    [
                                        { label: 'Email', value: doctor.email },
                                        { label: 'Onboarded On', value: doctor.onboarded_on },
                                        { label: 'Experience', value: doctor.experience },
                                        { label: 'Specialty', value: doctor.specialty },
                                        { label: 'Patients Served', value: doctor.patients },
                                        { label: 'Ratings', value: doctor.ratings },
                                    ].map(({ label, value }) => (
                                        <div key={`${label}-${value}`} className="grid grid-cols-12 gap-4 text-start my-2">
                                            <strong className="text-primary col-span-3">{label}</strong>
                                            <strong className="text-primary col-span-1"> : </strong>
                                            <p className="col-span-8">{value}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            <Button
                                className="bg-red-500 text-white ms-auto"
                                onClick={handleRemove}
                            >
                                Remove
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default Doctors;
