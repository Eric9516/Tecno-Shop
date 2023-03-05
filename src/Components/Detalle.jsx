import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/estilos.css";
import { Button, Card } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModalImg } from "../Components/ModalImg";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

export const Detalle = () => {
    const [show] = useState(false);
    const { id } = useParams();
    const [resultado, setResultado] = useState({});
    const navigate = useNavigate();
    const context = useContext(AuthContext);

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

    const handlerBuy = () => {
        if (context.login) {
            navigate(`/Comprar/${id}`);
        } else {
            Swal.fire({
                position: "top-center",
                icon: "info",
                title: "Inicie sesión para poder continuar con la compra",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate("/Login");
        }
    };

    return (
        <div className="contenedor_detalle">
            <Card style={{ width: "300px", margin: "0 auto" }}>
                <ModalImg show={show} img={resultado.image} />
                <Card.Body>
                    <Card.Title>🛒{resultado.name}</Card.Title>
                    <Card.Text>▪ Precio: ${resultado.price}</Card.Text>
                    <Card.Text>{resultado.description}</Card.Text>
                    <Button variant="primary" onClick={handlerBuy}>
                        Comprar
                    </Button>

                    <Link to={`/carrito/${id}`}>
                        <FaCartPlus size={"1.5em"} style={{ marginLeft: "20px" }} />
                    </Link>

                    {context.login && context.user.userId === "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                        <>
                            <br />
                            <br />
                            <Button variant="primary">
                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/editar/${id}`}>
                                    Editar
                                </Link>
                            </Button>
                            <Button size="small">
                                <Link to={`/carrito/${id}`}>
                                    <FaCartPlus size={"1.5em"} style={{ marginLeft: "20px" }} />
                                </Link>
                            </Button>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};
