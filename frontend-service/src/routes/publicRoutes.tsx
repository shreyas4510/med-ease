import { Navigate, Outlet } from 'react-router-dom';

const PublicRoutes = () => {
    const token = localStorage.getItem('token');
    return !token ? <Outlet /> : <Navigate to="/dashboard" />;
}

export default PublicRoutes;
