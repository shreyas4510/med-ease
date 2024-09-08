import { Routes as Switch, Route, BrowserRouter, Navigate } from 'react-router-dom';
import PublicRoutes from './publicRoutes';
import LandingPage from '../pages/landingPage';
import AuthRoutes from './authRoutes';
import NotFound from '../pages/notFound';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<PublicRoutes />}>
                    <Route path="" element={<LandingPage />} />
                </Route>
                <Route path="/" element={<AuthRoutes />}>
                </Route>
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </Switch>
        </BrowserRouter>
    );
}
