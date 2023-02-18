import { useContext, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import firebase from "../Config/firebase";

import React from "react";

const Perfil = () => {
    const context = useContext(AuthContext);

    return (
        <>
            <form action="">
                <input type="text" value={context.user.name} id="" readOnly />
                <input type="text" value={context.user.lastname} id="" readOnly />
                <input type="text" value={context.user.email} id="" readOnly />
            </form>
        </>
    );
};

export default Perfil;
