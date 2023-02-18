import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
    const [login, setLogin] = useState(localStorage.getItem("login") || false);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || {});
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handlerLogin = (userData) => {
        setEmail(email);
        setLogin(true);
        localStorage.setItem("login", true);
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const handlerLogOut = () => {
        setLogin(localStorage.getItem("login") || false);
        localStorage.removeItem("login");
        setUser();
        navigate("/home");
        window.location.reload();
    };
    return (
        <AuthContext.Provider
            value={{
                login,
                user,
                email,
                handlerLogin,
                handlerLogOut,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
