import React, { useState, useEffect, useContext } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { ModalData } from "../Components/ModalData";
import firebase from "../Config/firebase";
import { useParams } from "react-router-dom";
import { FotoPerfil } from "../Components/FotoPerfil";
import { estilosPerfil } from "../styles/estilosPerfil";
import { useFormState } from "react-hook-form";

export const Perfil = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [dni, setDni] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [direccion, setDireccion] = useState("");
    const [codigoPostal, setCodigoPostal] = useState("");
    const [telefono, setTelefono] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkWhatsapp, setLinkWhatsapp] = useState("");

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

    return (
        <>
            <FotoPerfil />
            <Form style={estilosPerfil.form}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={context.user.name} readOnly autoFocus="off" />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" value={context.user.lastname} readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={context.user.email} readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" readOnly value={dni} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control type="text" readOnly value={provincia} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" readOnly value={localidad} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" readOnly value={direccion} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control type="text" readOnly value={codigoPostal} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Número de teléfono</Form.Label>
                    <Form.Control type="text" readOnly value={telefono} />
                </Form.Group>
                {context.login && context.user.name === "Eric" && context.user.lastname === "Cantoni" && (
                    <>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Página de Facebook</Form.Label>
                            <Form.Control type="text" readOnly value={facebook} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Página de Instagram</Form.Label>
                            <Form.Control type="text" readOnly value={instagram} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Link de whatsapp</Form.Label>
                            <Form.Control type="text" readOnly value={linkWhatsapp} />
                        </Form.Group>
                    </>
                )}
                <ModalData show={show} handleClose={handleClose} handleShow={handleShow} />
            </Form>
        </>
    );
};
