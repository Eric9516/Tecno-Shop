import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { AuthContext } from "../Context/AuthContext";
import { ModalData } from "../Components/ModalData";
import { useParams } from "react-router-dom";
import { FotoPerfil } from "../Components/FotoPerfil";
import { estilosPerfil } from "../styles/estilosPerfil";
import { usePerfilData } from "../hooks/usePerfilData";

export const Perfil = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const perfilData = usePerfilData(id);
    console.log(Object.entries(perfilData));

    const primerLetraMayus = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const isEricCantoni = (user) => {
        return context.user.name === "Eric" && context.user.lastname === "Cantoni";
    };

    return (
        <>
            <FotoPerfil />
            <Form style={estilosPerfil.form}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={context.user.name} readOnly autoFocus={false} />
                </Form.Group>
                <Form.Group controlId="formBasicLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" value={context.user.lastname} readOnly />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={context.user.email} readOnly />
                </Form.Group>
                {Object.entries(perfilData).map(([key, value]) => (
                    <Form.Group key={key} controlId={`formBasic${key}`}>
                        <Form.Label>{primerLetraMayus(key)}</Form.Label>
                        <Form.Control type="text" readOnly value={value} />
                    </Form.Group>
                ))}
                {isEricCantoni() && (
                    <>
                        <Form.Group controlId="formBasicFacebook">
                            <Form.Label>Página de Facebook</Form.Label>
                            <Form.Control type="text" readOnly value={perfilData.facebook} />
                        </Form.Group>
                        <Form.Group controlId="formBasicInstagram">
                            <Form.Label>Página de Instagram</Form.Label>
                            <Form.Control type="text" readOnly value={perfilData.instagram} />
                        </Form.Group>
                        <Form.Group controlId="formBasicWhatsapp">
                            <Form.Label>Link de WhatsApp</Form.Label>
                            <Form.Control type="text" readOnly value={perfilData.linkWhatsapp} />
                        </Form.Group>
                    </>
                )}
                <ModalData show={show} handleClose={handleClose} handleShow={handleShow} />
            </Form>
        </>
    );
};
