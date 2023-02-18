import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import firebase from "../Config/firebase";

import React from "react";

const Perfil = () => {
    const context = useContext(AuthContext);

    return (
        <>
            <div>{context.user.name}</div>
            <div>{context.user.lastname}</div>
            <div>{context.user.userId}</div>
            <div>{context.user.email}</div>
        </>
    );
};

export default Perfil;
