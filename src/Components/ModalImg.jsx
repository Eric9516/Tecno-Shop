import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

const ModalImg = (props) => {
    const [show, setShow] = useState(false);

    return (
        <>
            <img style={{ cursor: "pointer" }} src={props.img} onClick={() => setShow(true)} alt="imagen del producto" />

            <Modal show={show} onHide={() => setShow(false)} dialogClassName="modal-90w" aria-labelledby="example-custom-modal-styling-title" size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">Imagenes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={props.img} style={{ width: "100%" }} alt="imagen del producto" />
                    {/* aca va a ir un carrusel con varias imagenes de los productos */}
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModalImg;
