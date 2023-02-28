import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import firebase from "../Config/firebase";
import estilos from "../styles/estilosSpinner";
import { Div, Input, DivBusqueda } from "../styles/estilosProductos";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import Footer from "./Footer";

const Productos = () => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");

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
    }, []);

    const buscando = resultado.filter((item) => {
        const products = item.data().name.toString().toLowerCase().includes(buscar.toLowerCase());
        return products;
    });
    const productosBuscados = [...buscando];

    if (loading) {
        return (
            <div style={estilos.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    } else {
        if (productosBuscados) {
            return (
                <>
                <Div>
                    <DivBusqueda>
                        <InputGroup className="mb-3">
                            <Input placeholder="Buscar productos" aria-label="Username" aria-describedby="basic-addon1" value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                            <InputGroup.Text>
                                <BsSearch size={"1.5em"} />
                            </InputGroup.Text>
                        </InputGroup>
                    </DivBusqueda>
                    <div className="contenedor_padre">
                        {productosBuscados.map((item) => {
                            return (
                                <div key={item.id}>
                                    <Card style={{ width: "14rem", minHeight: "450px" }}>
                                        <div style={{ width: "100%", height: "250px" }}>
                                            <Card.Img variant="top" src={item.data().image} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>🛒{item.data().name}</Card.Title>
                                            <Card.Text>▪ Precio: ${item.data().price}</Card.Text>

                                            <Button variant="primary">
                                                <Link style={{ color: "#fff", textDecoration: "none" }} to={`/producto/${item.id}`}>
                                                    Ver detalles
                                                </Link>
                                            </Button>
                                            <br />
                                        </Card.Body>
                                    </Card>
                                </div>
                            );
                        })}
                    </div>

                </Div>
                    <Footer />
                </>
                
            );
        }
    }
};

export default Productos;
