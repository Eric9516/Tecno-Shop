import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModalData } from "../Components/ModalData";
import firebase from "../Config/firebase";
import { useParams, Link } from "react-router-dom";
import { FotoPerfil } from "../Components/FotoPerfil";
import { estilosPerfil } from "../styles/estilosPerfil";

export const Perfil = () => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [datos, setDatos] = useState({ dni: "", provincia: "", localidad: "", direccion: "", codigoPostal: "", telefono: "" });

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", id).get();
                const data = consulta.docs[0].data();
                setDatos({ datos, dni: data.dni, provincia: data.provincia, localidad: data.localidad, direccion: data.direccion, codigoPostal: data.cod_postal, telefono: data.telefono });
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    });

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
                    <Form.Control type="text" readOnly value={datos.dni} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control type="text" readOnly value={datos.provincia} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" readOnly value={datos.localidad} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" readOnly value={datos.direccion} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control type="text" readOnly value={datos.codigoPostal} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Número de teléfono</Form.Label>
                    <Form.Control type="text" readOnly value={datos.telefono} />
                </Form.Group>{" "}
                <ModalData show={show} handleClose={handleClose} handleShow={handleShow} />
            </Form>
        </>
    );
};
