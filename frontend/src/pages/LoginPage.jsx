import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/authApi';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState( '' );
    const [password, setPassword] = useState( '' );
    const navigate = useNavigate();
    const [error, setError] = useState( null );



    const handleLogin = async () => {
        setError( null ); // Clear any previous error
        try {
            const response = await loginUser( username, password );
            login( response.data.user );
            const user = JSON.parse( localStorage.getItem( 'user' ) );
            { user.role === 'Admin' ? navigate( '/home' ) : navigate( '/jobs' ) }
        } catch ( error ) {
            setError( error.response?.data?.message || 'An unexpected error occurred' );
            console.error( 'Login error', error );
        }
    };


    return (

        <div className="max-w-md mx-auto mt-8 p-4 border rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Login</h2>
            {error && <p className="text-red-500">{error}</p>}
            <div className='mb-2'>
                Don't have an account?
                <a href="/register" className="text-slate-600 p-2">Register</a>
            </div>
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
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600" onClick={handleLogin}>Login</button>
        </div>
    );
}
