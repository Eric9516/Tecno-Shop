import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useUserData } from "../hooks/useUserData"; // Importa el nuevo hook aquí
import { AuthContext } from "../Context/AuthContext";
import { useContext } from "react";

const estilos = {
    boton: {
        marginBottom: "10px",
    },
};

export const ModalData = ({ show, handleClose, handleShow }) => {
    const context = useContext(AuthContext);
    const { handleSubmit, register, onSubmit } = useUserData(); // Usa el nuevo hook

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
