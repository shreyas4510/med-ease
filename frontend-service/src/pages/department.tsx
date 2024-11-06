import { Card, CardContent, IconButton, TextField } from '@mui/material';
import { Add, Close } from '@mui/icons-material';
import CustomModal from '../components/modal';
import { useNavigate } from 'react-router-dom';
import { useContext } from '../context';
import { getHospitalsDetails, manageDepartments } from '../api';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const Departments = () => {

    const { state, setDepartmentState } = useContext();
    const { addDeptModal, removeDept, deptName, departments } = state.departmentState;
    const navigate = useNavigate();

    const handleAddDepartment = async () => {
        const uniqueDepts = new Set([ ...departments, ...deptName.split(',') ]);
        const depts = Array.from(uniqueDepts, value => value.trim());
        const res = await manageDepartments({ departments: depts });
        if (res) {
            setDepartmentState(prev => ({
                ...prev,
                departments: res.departments
            }));
            toast.success('Departments added successfully');
            setDepartmentState(prev => (
                { ...prev, deptName: '', addDeptModal: false }
            ));
        }
    }

    const handleRemoveDepartment = async () => {
        const depts = [ ...departments ];
        depts.splice( depts.findIndex(i => i === removeDept), 1 );
        const res = await manageDepartments({ departments: depts });
        if (res) {
            setDepartmentState(prev => ({
                ...prev,
                departments: res.departments
            }));
            toast.success('Department removed successfully');
            setDepartmentState(prev => ({ ...prev, removeDept: '' }))
        }
    }

    useEffect(() => {
        ( async () => {
            const hospitalData = await getHospitalsDetails();
            setDepartmentState(prev => ({
                ...prev,
                departments: hospitalData.departments
            }));
        })()
    }, [])

    return (
        <div className="px-16 my-5 font-poppins text-3xl text-white">
            <div className="text-black text-3xl m-8 text-primary font-bold">Departments</div>
            <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 lg:grid-cols-6">
                {[...departments, 'add'].map((department) => (
                    <Card
                        key={department}
                        onClick={() => {
                            department === 'add' ? 
                            setDepartmentState(prev => ({
                                ...prev,
                                addDeptModal: true
                            })) :
                            navigate(`/department/${department}`)
                        }}
                        className="
                                flex h-40 bg-department-gradient justify-center
                                !border-0 hover:shadow-xl hover:translate-y-[-2px]
                                cursor-pointer transition-transform duration-300 relative group
                            "
                        variant="outlined"
                    >
                        {department !== 'add' && (
                            <IconButton
                                className="
                                    !absolute top-0 right-0 h-fit opacity-0 cursor-pointer
                                    group-hover:opacity-100 transition-opacity duration-200 z-10
                                "
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDepartmentState(prev => ({
                                        ...prev,
                                        removeDept: department
                                    }))
                                }}
                            >
                                <Close className="!text-primary" />
                            </IconButton>
                        )}
                        <CardContent className='flex items-center '>
                            {
                                department !== 'add' ? (
                                    <h4 className='text-lg'>{department}</h4>
                                ) : (
                                    <IconButton
                                        edge="end"
                                        color="primary"
                                    >
                                        <Add className='!text-7xl' />
                                    </IconButton>
                                )
                            }
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Add new department modal */}
            <CustomModal
                key={'add-dept-modal'}
                open={addDeptModal}
                title='Add Department'
                onClose={() => setDepartmentState(prev => (
                    { ...prev, deptName: '', addDeptModal: false }
                ))}
                onSuccess={handleAddDepartment}
                className='w-4/5 md:w-1/3'
            >
                <div className='flex flex-col'>
                    <TextField
                        label="Department Names"
                        value={deptName}
                        onChange={(e) => {
                            setDepartmentState(prev => ({
                                ...prev,
                                deptName: e.target.value 
                            }))
                        }}
                    />
                </div>
            </CustomModal>

            {/* modal to remove department */}
            <CustomModal
                key={'remove-dept-modal'}
                open={ Boolean(removeDept) }
                title='Remove Department'
                onClose={() => setDepartmentState(prev => ({ ...prev, removeDept: '' }))}
                onSuccess={handleRemoveDepartment}
                className='w-4/5 md:w-1/3'
            >
                <div className='flex flex-col'>
                    <p>Are you sure you want to remove the <strong>department</strong> ?</p>
                </div>
            </CustomModal>
        </div>
    );
};

export default Departments;
