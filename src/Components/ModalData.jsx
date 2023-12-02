import React, { useEffect, useContext } from "react";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const estilos = {
    boton: {
        marginBottom: "10px",
    },
};

export const ModalData = ({ show, handleClose, handleShow }) => {
    const { id } = useParams();
    const { handleSubmit, register, setValue } = useForm();
    const context = useContext(AuthContext);

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

        if (show) {
            obtenerDatosExistentes();
        }
    }, [id, show, setValue]);

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
            console.log(error.message);
            console.log(error.code);
        }
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow} style={estilos.boton}>
                Agregar datos
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos personales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} id="formulario">
                        <FloatingLabel controlId="floatingInput" label="DNI" className="mb-3">
                            <Form.Control type="text" placeholder="DNI" {...register("dni")} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Provincia" className="mb-3">
                            <Form.Control type="text" placeholder="Provincia" {...register("provincia")} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Localidad" className="mb-3">
                            <Form.Control type="text" placeholder="Localidad" {...register("localidad")} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Código postal" className="mb-3">
                            <Form.Control type="text" placeholder="Código postal" {...register("cod_postal")} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Dirección" className="mb-3">
                            <Form.Control type="text" placeholder="Dirección" {...register("direccion")} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Número de telefono" className="mb-3">
                            <Form.Control type="text" placeholder="Número de telefono" {...register("telefono")} />
                        </FloatingLabel>
                        {context.login && context.user.name === "Eric" && context.user.lastname === "Cantoni" && (
                            <>
                                <FloatingLabel controlId="floatingInput" label="Pagina de facebook" className="mb-3">
                                    <Form.Control type="text" placeholder="Página de Facebook" {...register("facebook")} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Pagina de instagram" className="mb-3">
                                    <Form.Control type="text" placeholder="Página de Instagram" {...register("instagram")} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingInput" label="Link Whatsapp" className="mb-3">
                                    <Form.Control type="text" placeholder="Link Whatsapp" {...register("linkWhatsapp")} />
                                </FloatingLabel>
                            </>
                        )}
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="formulario">
                        Guardar
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
