import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/estilos.css";
import { Button, Card } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const Detalle = () => {
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
                <Card.Img variant="top" src={resultado.image} />
                <Card.Body>
                    <Card.Title>🛒{resultado.name}</Card.Title>
                    <Card.Text>▪ Precio: ${resultado.price}</Card.Text>
                    <Card.Text>{resultado.description}</Card.Text>
                    <Button variant="primary" onClick={handlerBuy}>
                        Comprar
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Detalle;
