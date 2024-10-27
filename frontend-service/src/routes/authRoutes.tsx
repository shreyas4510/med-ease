import { Navigate, Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const AuthRoutes = ({ children, ...rest }: any) => {
    const token = localStorage.getItem('token');
    return token ? (
        <>
            <Navbar />
            <Outlet />
        </>
    ) : (
        <Navigate to="/" replace />
    );
}

export default AuthRoutes;
