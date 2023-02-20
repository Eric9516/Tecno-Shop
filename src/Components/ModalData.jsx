import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const estilos = {
    boton: {
        marginBottom: "10px",
    },
};

const ModalData = ({ show, handleClose, handleShow }) => {
    return (
        <>
            <Button variant="primary" onClick={handleShow} style={estilos.boton}>
                Agregar o modificar datos
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Datos personales</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FloatingLabel controlId="floatingInput" label="DNI" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Provincia" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Localidad" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Código postal" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Dirección" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Número de telefono" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalData;
