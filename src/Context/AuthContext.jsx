import React, { useState } from "react";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(localStorage.getItem("login") || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [admin, setAdmin] = useState("");
    const handlerLogin = (userData, name) => {
        setAdmin(name);
        setLogin(true);
        localStorage.setItem("login", true);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const handlerLogOut = () => {
        setLogin(localStorage.getItem("login") || false);
        localStorage.removeItem("login");
        setUser();
        window.location.reload();
    };
    return (
        <AuthContext.Provider
            value={{
                login,
                admin,
                user,
                handlerLogin,
                handlerLogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
