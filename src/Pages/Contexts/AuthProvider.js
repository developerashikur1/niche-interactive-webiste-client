import React, { createContext } from 'react';
import useFirebase from '../Hooks/useFirebase';


export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const contextsAll = useFirebase();
    return (
        <AuthContext.Provider value={contextsAll}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;