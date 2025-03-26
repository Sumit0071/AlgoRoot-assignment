import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Flag from 'react-world-flags'; // Use this for rendering flags

const Navbar = () => {
    const { user, logout } = useAuth();
    const location = useLocation();

    // Check if we're on either the /home or /tasks routes
    const isHomeOrTasksPage = location.pathname === '/home' || location.pathname === '/tasks';

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand/Logo */}
                <Link
                    to={location.pathname === '/' ? '/' : '/home'}
                    className="text-white text-lg font-semibold"
                >
                    Task Management
                </Link>

                {/* Show user information and logout button on /home or /jobs */}
                {isHomeOrTasksPage && user ? (
                    <div className="flex items-center space-x-4">
                        {/* Dynamically generate the flag based on user's country */}
                        {user.country && (
                            <div className="flex items-center space-x-2">
                                <Flag
                                    code={user.country}
                                    alt={`${user.country} flag`}
                                    className="w-6 h-6 rounded-full"
                                />
                                <span className="text-white">{user.username}</span>
                            </div>
                        )}

                        {/* Logout button */}
                        <button
                            onClick={logout}
                            className="bg-red-500 px-4 py-2 text-white rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    // For non-home routes, show Login link if user is not logged in
                    !user && location.pathname !== '/home' && (
                        <Link to="/login" className="text-white">Login</Link>
                    )
                )}
            </div>
        </nav>
    );
};

export default Navbar;
