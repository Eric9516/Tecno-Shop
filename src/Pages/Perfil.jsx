import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import ModalData from "../Components/ModalData";

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

const Perfil = () => {
    const context = useContext(AuthContext);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            {<div></div> /*foto de perfil */}
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
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Provincia</Form.Label>
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Localidad</Form.Label>
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Dirección</Form.Label>
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Código postal</Form.Label>
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Número de teléfono</Form.Label>
                    <Form.Control type="text" readOnly />
                </Form.Group>{" "}
                <ModalData show={show} handleClose={handleClose} handleShow={handleShow} />
            </Form>
        </>
    );
};

export default Perfil;
