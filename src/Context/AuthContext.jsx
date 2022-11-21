import React, { useState } from "react";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(false);
    const handlerLogin = () => {
        setLogin(true);
    };
    const handlerLogOut = () => {
        setLogin(false);
    };
    return (
        <AuthContext.Provider
            value={{
                login,
                handlerLogin,
                handlerLogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
