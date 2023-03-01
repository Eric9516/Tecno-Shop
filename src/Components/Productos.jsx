import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import firebase from "../Config/firebase";
import estilos from "../styles/estilosSpinner";
import { Div, Input, DivBusqueda } from "../styles/estilosProductos";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";
import { Footer } from "./Footer";

export const Productos = () => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");
    const [masDatos, setMasDatos] = useState();

    useEffect(() => {
        const response = async () => {
            firebase
                .firestore()
                .collection("productos")
                .limit(4)
                .orderBy("name", "asc")
                .get()
                .then((querySnapshot) => {
                    const datos = querySnapshot.docs.map((datos) => datos.data());
                    const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setResultado(datos);
                    setMasDatos(otrosDatos);
                    setLoading(false);
                });
        };
        response();
    }, []);

    const buscando = resultado.filter((item) => {
        const products = item.name.toString().toLowerCase().includes(buscar.toLowerCase());
        return products;
    });
    const productosBuscados = [...buscando];

    const fetchMore = () => {
        firebase
            .firestore()
            .collection("productos")
            .orderBy("name", "asc")
            .startAfter(masDatos)
            .limit(4)
            .get()
            .then((querySnapshot) => {
                const datos = querySnapshot.docs.map((datos) => datos.data());
                const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];
                setResultado((resultado) => [...resultado, ...datos]);
                setMasDatos(otrosDatos);
            });
    };

    if (loading) {
        return (
            <div style={estilos.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    } else {
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
                                            <Card.Img variant="top" src={item.image} />
                                        </div>
                                        <Card.Body>
                                            <Card.Title>🛒{item.name}</Card.Title>
                                            <Card.Text>▪ Precio: ${item.price}</Card.Text>
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
                    <Button onClick={fetchMore}>Mostrar mas</Button>
                </Div>
                <Footer />
            </>
        );
    }
};
