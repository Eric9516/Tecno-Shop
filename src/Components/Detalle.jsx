import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "../styles/estilos.css";
import { Card } from "react-bootstrap";
import firebase from "../Config/firebase";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditIcon from "@mui/icons-material/Edit";
import { Tooltip, IconButton, Stack, Button } from "@mui/material";
import { Div } from "../styles/StyledDetalle";

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
        <Div>
            <Card style={{ width: "300px", margin: "0 auto" }}>
                {context.login && context.user.userId === "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                    <>
                        <Stack direction="row" spacing={5}>
                            <Tooltip title="Editar">
                                <IconButton>
                                    <Link style={{ textDecoration: "none" }} to={`/producto/editar/${id}`}>
                                        <EditIcon />
                                    </Link>
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </>
                )}
                <img show={show} src={resultado.image} />
                <Card.Body>
                    <Card.Title>🛒{resultado.name}</Card.Title>
                    <Card.Text>▪ Precio: ${resultado.price}</Card.Text>
                    <Card.Text>{resultado.description}</Card.Text>
                    <Stack direction="row" spacing={5}>
                        <Button onClick={handleBuy}>
                            <strong style={{ fontSize: "1.2em" }}>Comprar</strong>
                        </Button>
                        <Tooltip title="Agregar al carrito" placement="top">
                            <Link to={`/carrito/${id}`}>
                                <AddShoppingCartIcon style={{ fontSize: "1.7em" }} />
                            </Link>
                        </Tooltip>
                    </Stack>
                </Card.Body>
            </Card>
        </Div>
    );
};
