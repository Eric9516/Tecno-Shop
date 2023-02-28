import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModalData } from "../Components/ModalData";
import firebase from "../Config/firebase";
import { useParams } from "react-router-dom";
import { FotoPerfil } from "../Components/FotoPerfil";

const estilos = {
    form: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    boton: {
        marginBottom: "10px",
    },
};

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
    const [cod_postal, setCod_postal] = useState("");
    const [telefono, setTelefono] = useState("");

    useEffect(() => {
        const peticion = async () => {
            try {
                const consulta = await firebase.firestore().collection("datosUsuarios").where("user_id", "==", id).get();
                const data = consulta.docs[0].data();
                setDni(data.dni);
                setProvincia(data.provincia);
                setLocalidad(data.localidad);
                setDireccion(data.direccion);
                setCod_postal(data.cod_postal);
                setTelefono(data.telefono);
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    });

    return (
        <>
            <FotoPerfil />
            <Form style={estilos.form}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" value={context.user.name} readOnly autoFocus="off" />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" value={context.user.lastname} readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" value={context.user.userId} readOnly hidden />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" value={context.user.email} readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control type="text" readOnly value={dni} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control type="text" readOnly value={provincia} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" readOnly value={localidad} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" readOnly value={direccion} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control type="text" readOnly value={cod_postal} />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Número de teléfono</Form.Label>
                    <Form.Control type="text" readOnly value={telefono} />
                </Form.Group>{" "}
                <ModalData show={show} handleClose={handleClose} handleShow={handleShow} />
            </Form>
        </>
    );
};
