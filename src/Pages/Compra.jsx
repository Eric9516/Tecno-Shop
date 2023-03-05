import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import firebase from "../Config/firebase";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Swal from "sweetalert2";

const estilos = {
    form: {
        width: "50%",
        marginLeft: "auto",
        marginRight: "auto",
    },
    image: {
        width: "100px",
    },
    h3: {
        // textAlign: "center",
        marginTop: "50px",
    },
    table: {
        borderRadius: "5px 5px 5px 5px",
        padding: "20px",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "10px",
    },
    th: {
        border: "2px solid #000",
        textAlign: "center",
        paddingLeft: "40px",
        paddingRight: "40px",
    },
    td: {
        border: "2px solid #000",
        height: "100px",
        paddingLeft: "40px",
        paddingRight: "40px",
    },
};

export const Comprar = () => {
    const [cantidad, setCantidad] = useState(1);
    const [pay, setPay] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [resultado, setResultado] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        const peticion = async () => {
            try {
                const pet = await firebase.firestore().doc(`productos/${id}`).get();
                setResultado(pet.data());
            } catch (error) {
                console.log(error);
            }
        };
        peticion();
    }, [id]);

    const sumar = () => {
        return setCantidad(+cantidad + 1);
    };
    const restar = () => {
        if (cantidad > 1) {
            return setCantidad(+cantidad - 1);
        } else {
            alert("No se puede comprar menos de 1 producto");
        }
    };

    const clickComprar = () => {
        if (nombre !== "" && apellido !== "" && email !== "") {
            Swal.fire({
                title: "<strong>Gracias por su compra!</strong>",
                icon: "success",
                html: "A la brevedad nos pondremos en contacto con usted para coordinar el envio del producto.",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
                confirmButtonAriaLabel: "Thumbs up, great!",
            });
            navigate("/Home");
        } else {
            Swal.fire({
                title: "<strong>Datos a completar</strong>",
                icon: "error",
                html: "Tiene campos vacíos, completelos para poder finalizar la compra",
                showCloseButton: true,
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Continuar',
                confirmButtonAriaLabel: "Thumbs up, great!",
            });
        }
    };

    return (
        <div>
            <Form style={estilos.form} onSubmit={clickComprar}>
                <Form.Group className="mb-3">
                    <Form.Label>Método de pago</Form.Label>
                    <Form.Select value={pay} onChange={(e) => setPay(e.target.value)}>
                        <option>Efectivo/Pago Facil/Rapipago</option>
                        <option>Tarjeta de crédito</option>
                    </Form.Select>
                </Form.Group>
                <>
                    {pay === "Tarjeta de crédito" ? (
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label></Form.Label>
                            <Form.Control type="number" placeholder="N° de tarjeta" required />
                        </Form.Group>
                    ) : null}
                </>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Ingrese su apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Ingrese su Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Comprar
                </Button>
            </Form>
            <table style={estilos.table}>
                <h3 style={estilos.h3}>Detalle de la compra</h3>
                <tr>
                    <th style={estilos.th}>Producto</th>
                    <th style={estilos.th}>Precio</th>
                    <th style={estilos.th}>Imagen</th>
                    <th style={estilos.th}>Cantidad</th>
                </tr>
                <tr>
                    <td style={estilos.td}>
                        <strong>{resultado.name}</strong>
                    </td>
                    <td style={estilos.td}>
                        <strong>${resultado.price * cantidad}</strong>
                    </td>
                    <td style={estilos.td}>
                        <img src={resultado.image} alt="" style={estilos.image} />
                    </td>
                    <td style={estilos.td}>
                        <ButtonToolbar aria-label="Toolbar with button groups">
                            <ButtonGroup aria-label="Third group">
                                <Button onClick={sumar}>+</Button>
                            </ButtonGroup>
                            <ButtonGroup aria-label="Third group">
                                <Button onClick={restar}>-</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                        <p className="cantidad">{cantidad}</p>
                    </td>
                </tr>
            </table>
        </div>
    );
};
