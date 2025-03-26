import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children, roles }) {
    const { user } = useAuth();
    if (!user || !roles.includes(user.role)) {
        return <Navigate to="/login" />;
    }
    return children;
}
