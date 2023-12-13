import { auth, firestore, storage } from "../Config/firebase";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useFooter = () => {
    const context = useContext(AuthContext);

    const [telefono, setTelefono] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firestore.collection("datosUsuarios").where("user_id", "==", context.user.userId).get();
                if (consulta.docs.length > 0) {
                    const data = consulta.docs[0].data();
                    setTelefono(data.telefono);
                    setFacebook(data.facebook);
                    setInstagram(data.instagram);
                }
            } catch (error) {
                console.log(error);
            }
        };

        peticion();
    }, [context.user.userId]);
    return { telefono, facebook, instagram };
};
