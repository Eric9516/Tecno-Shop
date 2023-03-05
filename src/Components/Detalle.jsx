import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/estilos.css";
import { Card } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { ModalImg } from "../Components/ModalImg";
import { Link } from "react-router-dom";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

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

    const handleBuy = () => {
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
                    <Stack direction="row" spacing={5}>
                        <Button onClick={handleBuy}>
                            <strong style={{ fontSize: "1.2em" }}>Comprar</strong>
                        </Button>
                        <Link to={`/carrito/${id}`}>
                            <AddShoppingCartIcon style={{ fontSize: "1.7em" }} />
                        </Link>
                    </Stack>

                    {context.login && context.user.userId === "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                        <>
                            <Stack direction="row" spacing={5}>
                                <Button>
                                    <Link style={{ textDecoration: "none" }} to={`/producto/editar/${id}`}>
                                        <strong style={{ fontSize: "1.2em" }}>Editar</strong>
                                    </Link>
                                </Button>
                            </Stack>
                        </>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
};
