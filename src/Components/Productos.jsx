import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import firebase from "../Config/firebase";

const Productos = () => {
    const [resultado, setResultado] = useState([]);
    useEffect(() => {
        const response = async () => {
            try {
                firebase
                    .firestore()
                    .collection("productos")
                    .get()
                    .then((querySnapshot) => {
                        const datos = querySnapshot.docs;
                        setResultado(datos);
                    });
            } catch (e) {
                console.log(e);
            }
        };
        response();
    });

    return (
        <div className="contenedor_padre">
            {resultado.map((item) => {
                return (
                    <div key={item.id}>
                        <Card style={{ width: "14rem", minHeight: "500px" }}>
                            <Card.Img variant="top" src={item.data().image} />
                            <Card.Body>
                                <Card.Title>🛒{item.data().name}</Card.Title>
                                <Card.Text>▪ Precio: ${item.data().price}</Card.Text>
                                <Button variant="primary">
                                    <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                                        Ver detalles
                                    </Link>
                                </Button>
                                <br />
                                <br />
                                <Button variant="primary">
                                    <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/editar/${item.id}`}>
                                        Editar
                                    </Link>
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );
};

export default Productos;
