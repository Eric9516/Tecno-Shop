import { useEffect } from "react";
import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export const useUserData = () => {
    const { id } = useParams();
    const { handleSubmit, register, setValue } = useForm();

    useEffect(() => {
        const obtenerDatosExistentes = async () => {
            try {
                const consulta = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", id).get();
                if (consulta.docs.length > 0) {
                    const data = consulta.docs[0].data();

                    setValue("dni", data.dni || "");
                    setValue("provincia", data.provincia || "");
                    setValue("localidad", data.localidad || "");
                    setValue("cod_postal", data.cod_postal || "");
                    setValue("direccion", data.direccion || "");
                    setValue("telefono", data.telefono || "");
                    setValue("facebook", data.facebook || "");
                    setValue("instagram", data.instagram || "");
                    setValue("linkWhatsapp", data.linkWhatsapp || "");
                }
            } catch (error) {
                console.log(error);
            }
        };

        obtenerDatosExistentes();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        try {
            const existingDoc = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", id).get();

            if (existingDoc.docs.length > 0) {
                const docId = existingDoc.docs[0].id;

                const updatedFields = {};
                if (data.dni !== "") updatedFields.dni = data.dni;
                if (data.provincia !== "") updatedFields.provincia = data.provincia;
                if (data.localidad !== "") updatedFields.localidad = data.localidad;
                if (data.cod_postal !== "") updatedFields.cod_postal = data.cod_postal;
                if (data.direccion !== "") updatedFields.direccion = data.direccion;
                if (data.telefono !== "") updatedFields.telefono = data.telefono;
                if (data.facebook !== "") updatedFields.facebook = data.facebook;
                if (data.instagram !== "") updatedFields.instagram = data.instagram;
                if (data.linkWhatsapp !== "") updatedFields.linkWhatsapp = data.linkWhatsapp;

                await firebase.firestore().collection("datosUsuarios").doc(docId).update(updatedFields);
            } else {
                await firebase.firestore().collection("datosUsuarios").add({
                    dni: data.dni,
                    provincia: data.provincia,
                    localidad: data.localidad,
                    cod_postal: data.cod_postal,
                    direccion: data.direccion,
                    telefono: data.telefono,
                    user_id: id,
                    facebook: data.facebook,
                    instagram: data.instagram,
                    linkWhatsapp: data.linkWhatsapp,
                });
            }

            Swal.fire({
                title: "<strong>Sus datos se han guardado exitosamente</strong>",
                icon: "success",
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
            });
        } catch (error) {
            console.error(error.message);
            console.error(error.code);
        }
    };

    return { handleSubmit, register, onSubmit };
};
