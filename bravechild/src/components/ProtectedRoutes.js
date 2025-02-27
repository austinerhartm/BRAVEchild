import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../services/auth.service';

const ProtectedRoute = ({ route, allowedRoles = [] }) => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [hasAccess, setHasAccess] = useState(false);
    const isAuthenticated = AuthService.isAuthenticated();

    useEffect(() => {
        const checkAccess = async () => {
            if (!isAuthenticated) {
                setIsLoading(false);
                return;
            }

            try {
                if (allowedRoles.length === 0) {
                    setHasAccess(true);
                } else {
                    const userRole = await AuthService.getUserRole();
                    setHasAccess(allowedRoles.includes(userRole));
                }
            } catch (error) {
                console.error('Error checking access:', error);
                setHasAccess(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAccess();
    }, [isAuthenticated, allowedRoles]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasAccess) {
        return <Navigate to="/" replace />;
    }

    return route;
}

export default ProtectedRoute;