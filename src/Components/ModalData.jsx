import React from "react";
import Swal from "sweetalert2";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import firebase from "../Config/firebase";
import { useParams } from "react-router-dom";

const estilos = {
    boton: {
        marginBottom: "10px",
    },
};

const ModalData = ({ show, handleClose, handleShow }) => {
    const { id } = useParams();
    const context = useContext(AuthContext);
    const { handleSubmit, register } = useForm();

    const onSubmit = async (data) => {
        try {
            await firebase.firestore().collection("datosUsuarios").add({
                dni: data.dni,
                provincia: data.provincia,
                localidad: data.localidad,
                cod_postal: data.cod_postal,
                direccion: data.direccion,
                telefono: data.telefono,
                user_id: id,
            });
            Swal.fire({
                title: "<strong>Sus datos de han guardado exitosamente</strong>",
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
                            <Form.Control type="text" placeholder="name@example.com" {...register("dni", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Provincia" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" {...register("provincia", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Localidad" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" {...register("localidad", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Código postal" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" {...register("cod_postal", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Dirección" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" {...register("direccion", { required: true })} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Número de telefono" className="mb-3">
                            <Form.Control type="text" placeholder="name@example.com" {...register("telefono", { required: true })} />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit" form="formulario" onClick={handleClose}>
                        Guardar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModalData;