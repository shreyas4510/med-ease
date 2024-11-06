import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import Button from "../components/button";
import { useEffect } from "react";
import { useContext } from "../context";
import { getDoctors, getUnmappedDoctors, manageDoctorStatus } from "../api";
import CustomModal from "../components/modal";
import CustomSelect from "../components/select";
import { Formik } from "formik";
import toast from "react-hot-toast";

const Doctors = () => {

    const { state, setDoctors } = useContext();
    const { doctors, addDoctorModal, doctorId, unmappedDoctors } = state.doctors;

    const manageDoctors = async (action: string, doctorId: string) => {
        const res = await manageDoctorStatus(doctorId, action)
        if (res?.message.toLowerCase() === 'success') {
            if ( action === 'onboard' ) {
                toast.success('Doctor onboarded successfully');
            } else {
                toast.success('Doctor offboarded successfully');
            }
            getDepartmentDoctors();
        }
    }

    const handleSearch = async (search: string) => {
        const unmappedDoctorsData = await getUnmappedDoctors(search);
        setDoctors(prev => ({
            ...prev,
            unmappedDoctors: (unmappedDoctorsData || []).map(
                (item: Record<string, string>) => ({
                    label: item.email, value: item.id
                })
            )
        }));
    }

    const getDepartmentDoctors = async () => {
        const pathname = window.location.pathname;
        const dept = pathname.split('/');
        const deptName = dept[dept.length - 1];

        const data = await getDoctors(deptName);
        const unmappedDoctorsData = await getUnmappedDoctors();
        setDoctors(prev => ({
            ...prev,
            doctors: data || [],
            addDoctorModal: false,
            doctorId: '',
            unmappedDoctors: (unmappedDoctorsData || []).map(
                (item: Record<string, string>) => ({
                    label: item.email, value: item.id
                })
            )
        }));
    }

    useEffect(() => {
        getDepartmentDoctors();
    }, [])

    return (
        <div>
            <div className="text-black text-3xl m-8 text-primary font-bold">Doctors</div>
            <div className="flex mx-8">
                <Button
                    className="bg-primary text-white ms-auto"
                    onClick={() => setDoctors(prev => (
                        { ...prev, doctorId: '', addDoctorModal: true }
                    ))}
                >
                    Add Doctor
                </Button>
            </div>
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
                                        { label: 'Onboarded On', value: doctor.onBoarded },
                                        { label: 'Experience', value: doctor.experience },
                                        { label: 'Specialty', value: doctor.speciality },
                                        { label: 'Patients Served', value: doctor.patientServed },
                                        { label: 'Ratings', value: doctor.rating },
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
                                onClick={() => {
                                    manageDoctors('offboard', doctor.id)
                                }}
                            >
                                Remove
                            </Button>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>

            {/* Add new department modal */}
            <CustomModal
                key={'add-doctor-modal'}
                open={addDoctorModal}
                title='Add Department'
                onClose={() => setDoctors(prev => (
                    { ...prev, doctorId: '', addDoctorModal: false }
                ))}
                onSuccess={() => {
                    if (!doctorId) {
                        toast.error('Please select doctor')
                        return;
                    }
                    manageDoctors('onboard', doctorId)
                }}
                className='w-4/5 md:w-1/3'
            >
                <div className='flex flex-col'>
                    <Formik
                        initialValues={{ email: '' }}
                        onSubmit={() => {}}
                    >
                        {
                            ({ setFieldValue }) => (
                                <CustomSelect
                                    key={'unmapped-doctors'}
                                    name="email"

                                    options={unmappedDoctors}
                                    setFieldValue={(name, value) => {
                                        setDoctors((prev) => ({
                                            ...prev,
                                            doctorId: value
                                        }))
                                        setFieldValue(name, value);
                                    }}
                                    onSearch={handleSearch}
                                />
                            )
                        }
                    </Formik>
                </div>
            </CustomModal>
        </div>
    )
}

export default Doctors;
