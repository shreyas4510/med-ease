import { Navigate } from 'react-router-dom';

const AuthRoutes = () => {
    const token = localStorage.getItem('token');
    return token ? (
        <>
        </>
    ) : (
        <Navigate to="/" replace />
    );
}

export default AuthRoutes;
