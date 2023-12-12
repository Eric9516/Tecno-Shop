import { useState, useEffect } from "react";
import firebase from "../Config/firebase";

export const usePerfilData = (id) => {
    const [dni, setDni] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codigo_Postal, setCodigoPostal] = useState("");
    const [telefono, setTelefono] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [link_Whatsapp, setLinkWhatsapp] = useState("");

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", id).get();
                if (consulta.docs.length > 0) {
                    const data = consulta.docs[0].data();
                    setDni(data.dni);
                    setProvincia(data.provincia);
                    setLocalidad(data.localidad);
                    setDireccion(data.direccion);
                    setCodigoPostal(data.cod_postal);
                    setTelefono(data.telefono);
                    setFacebook(data.facebook);
                    setInstagram(data.instagram);
                    setLinkWhatsapp(data.linkWhatsapp);
                }
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    }, [id]);

    return { dni, provincia, localidad, direccion, codigo_Postal, telefono, facebook, instagram, link_Whatsapp };
};
