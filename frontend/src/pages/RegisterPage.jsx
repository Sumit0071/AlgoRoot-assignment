import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/authApi';
import { useAuth } from '../context/AuthContext';
import ReactFlagsSelect from 'react-flags-select';
import Flag from 'react-world-flags'; // import flag component

export default function RegisterPage() {
    const { login } = useAuth();
    const [role, setRole] = useState( '' );
    const [username, setUsername] = useState( '' );
    const [password, setPassword] = useState( '' );
    const [country, setCountry] = useState( '' ); // for multi-country support
    const [countryFlag, setCountryFlag] = useState( '' ); // Variable to store country flag image
    const [error, setError] = useState( null );
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const userData = { username, password, role, country }; // Include flag in registration data
            const response = await registerUser( userData );
            login( response.data.user ); // Automatically log in after registration
            navigate( '/login' ); // Redirect to the login page
        } catch ( err ) {
            setError( err.message || 'Registration failed. Please try again.' );
        }
    };

    const handleCountrySelect = ( code ) => {
        setCountry( code );
        setCountryFlag( <Flag code={code} alt={code} className="w-10 h-10" /> ); // Set the flag image based on country code
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Register</h2>
            {error && <p className="text-red-500">{error}</p>}

            <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={( e ) => setUsername( e.target.value )}
                    className="w-full p-2 border rounded"
                    placeholder="Enter a username"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={( e ) => setPassword( e.target.value )}
                    className="w-full p-2 border rounded"
                    placeholder="Enter a password"
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Role</label>
                <select
                    value={role}
                    onChange={( e ) => setRole( e.target.value )}
                    className="w-full p-2 border rounded"
                    required
                >
                    <option value="">Select your Role</option>
                    <option value="Viewer">Viewer</option>
                    <option value="Admin">Admin</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="block text-gray-700">Country</label>
                <ReactFlagsSelect
                    selected={country}
                    onSelect={handleCountrySelect}
                />
            </div>

            {country && (
                <div className="mb-4">
                    <label className="block text-gray-700">Selected Country Flag</label>
                    <div>{countryFlag}</div> {/* Display the country flag image */}
                </div>
            )}

            <p className="text-slate-300">
                If you already have an account <a href="/login">Login</a>
            </p>

            <button
                onClick={handleRegister}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Register
            </button>
        </div>
    );
}
