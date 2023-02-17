import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const estilos = {
    spinner: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: "50px",
    },
};

const Productos = () => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const context = useContext(AuthContext);
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
                        setLoading(false);
                    });
            } catch (e) {
                console.log(e);
            }
        };
        response();
    });

    if (loading) {
        return (
            <div style={estilos.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    } else {
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
                                    {context.login && context.admin == "Eric" && (
                                        <>
                                            <Button variant="primary">
                                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                                                    Ver detalles
                                                </Link>
                                            </Button>
                                            <br />
                                            <Button variant="primary">
                                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/editar/${item.id}`}>
                                                    Editar
                                                </Link>
                                            </Button>
                                            <br />
                                        </>
                                    )}
                                    {context.login && context.admin !== "Eric" && (
                                        <>
                                            <Button variant="primary">
                                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                                                    Ver detalles
                                                </Link>
                                            </Button>
                                            <br />
                                        </>
                                    )}
                                    {!context.login && (
                                        <>
                                            <Button variant="primary">
                                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                                                    Ver detalles
                                                </Link>
                                            </Button>
                                        </>
                                    )}

                                    <br />
                                    <br />
                                </Card.Body>
                            </Card>
                        </div>
                    );
                })}
            </div>
        );
    }
};

export default Productos;
