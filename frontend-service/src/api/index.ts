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
        return await api(`/hospital?search=${search}`, 'get');
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const registerHospital = async (data: object) => {
    try {
        return await api('/hospital/register', 'post', data);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const registerDoctor = async (data: object) => {
    try {
        return await api('/doctor', 'post', data);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const login = async (data: object, type: string) => {
    try {
        const url = type === 'hospital' ? '/hospital/login' : '/doctor/login';
        return await api(url, 'post', data);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const manageDepartments = async (payload: Record<string, Array<string>>) => {
    try {
        return await api('/hospital/departments', 'post', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getDepartments = async (payload: Record<string, Array<string>>) => {
    try {
        return await api('/hospital/departments', 'post', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getHospitalsDetails = async () => {
    try {
        return await api('/hospital/details', 'get');
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getDoctors = async (deptName: string) => {
    try {
        return await api(`/doctor/${deptName}`, 'get');
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getUnmappedDoctors = async (email: string = '') => {
    try {
        return await api(`/doctor/unmapped?email=${encodeURIComponent(email)}`, 'get');
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
        return await api(`/doctor`, 'put', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const manageSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api('/slots', 'post', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const deleteSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api('/slots', 'delete', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

export const getSlots = async (payload: Record<string, string | Array<string>>) => {
    try {
        return await api('/slots/get', 'post', payload);
    } catch (error) {
        toast.error((error as ApiError).message);
    }
}

const api = async (
    url: string,
    method: 'get' | 'put' | 'post' | 'delete',
    body: object = {},
    headers: object = {}
) => {
    try {
        let response;
        url = `${process.env.REACT_APP_BASE_URL}${url}`;
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
