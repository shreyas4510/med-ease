import toast from "react-hot-toast";
import AxiosInstance from "./apiConfig";

interface ApiError {
    response: {
        data: {
            message: string;
        };
    };
    message: string;
}

export const getHospitalsList = async (search: string) => {
    try {
        return await api({ path: `/hospital?search=${search}`, method: 'get' });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getDoctorListByDepartment = async (body: Record<string, string> ) => {
    try {
        return await api({ path: `/doctor/list`, method: 'post', body});
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const registerHospital = async (data: object) => {
    try {
        return await api({ path: '/hospital/register', method: 'post', body: data });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const registerDoctor = async (data: object) => {
    try {
        return await api({ path: '/doctor', method: 'post', body: data });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const login = async (data: object, type: string) => {
    try {
        const path = type === 'hospital' ? '/hospital/login' : '/doctor/login';
        return await api({ path, method: 'post', body: data });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const manageDepartments = async (payload: Record<string, Array<string>>) => {
    try {
        return await api({ path: '/hospital/departments', method: 'post', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getDepartments = async (payload: Record<string, Array<string>>) => {
    try {
        return await api({ path: '/hospital/departments', method: 'post', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getHospitalsDetails = async () => {
    try {
        return await api({ path: '/hospital/details', method: 'get' });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getDoctors = async (deptName: string) => {
    try {
        return await api({ path: `/doctor/${deptName}`, method: 'get' });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getUnmappedDoctors = async (email: string = '') => {
    try {
        return await api({ path: `/doctor/unmapped?email=${encodeURIComponent(email)}`, method: 'get' });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const manageDoctorStatus = async (doctorId: string, action: string) => {
    try {
        const payload = {
            doctor: doctorId,
            action: action
        };
        return await api({ path: `/doctor`, method: 'put', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const manageSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api({ path: '/slots', method: 'post', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const deleteSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api({ path: '/slots', method: 'delete', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api({ path: '/slots/get', method: 'post', body: payload });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getAvailableSlots = async (payload: Record<string, string | boolean>) => {
    try {
        return await api({ path: '/slots/available', method: 'post', body: payload, type: 'scheduler' });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const bookAppointment = async (payload: Record<string, string>) => {
    try {
        return await api({
            path: '/appointment',
            method: 'post',
            body: payload
        });
    } catch (error) {
        toast.error((error as ApiError).message);
    }
};


interface TProps {
    path: string;
    method: 'get' | 'put' | 'post' | 'delete';
    body?: object;
    headers?: object;
    type?: 'scheduler' | 'user';
}

const api = async ({
    path,
    method,
    body = {},
    headers = {},
    type = 'user'
}: TProps ) => {
    try {
        let response;
        let url;

        switch (type.toLowerCase()) {
            case 'scheduler':
                url = `${process.env.REACT_APP_SCHEDULER_BASE_URL}${path}`
                break;
            default:
                url = `${process.env.REACT_APP_USER_BASE_URL}${path}`
                break;
        }

        switch (method) {
            case 'get':
                response = await AxiosInstance.get(url, { headers });
                break;
            case 'post':
                response = await AxiosInstance.post(url, body, { headers });
                break;
            case 'put':
                response = await AxiosInstance.put(url, body, { headers });
                break;
            case 'delete':
                response = await AxiosInstance.delete(url, { headers, data: body });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return response.data;
    } catch (error) {
        const errorMessage = (error as ApiError).response?.data?.message || (error as ApiError).message || 'An unexpected error occurred';
        throw new Error(errorMessage);
    }
};
