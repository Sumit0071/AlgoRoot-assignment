import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const AuthProvider = ( { children } ) => {


    const [user, setUser] = useState( JSON.parse( localStorage.getItem( 'user' ) ) );

    const login = ( userData ) => {
        localStorage.setItem( 'user', JSON.stringify( userData ) );
        // localStorage.setItem( 'authToken', token );
        setUser( userData );
    };

    const logout = () => {
        localStorage.removeItem( 'user' );
        setUser( null );
        Navigate( '/home' )
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext( AuthContext );
