import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Card, Spinner } from "react-bootstrap";
import firebase from "../Config/firebase";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import estilos from "../styles/estilosSpinner";
import { Div, Input, DivBusqueda } from "../styles/estilosProductos";
import { BsSearch } from "react-icons/bs";
import Footer from "../Components/Footer";
import InputGroup from "react-bootstrap/InputGroup";

const Productos = () => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");
    const context = useContext(AuthContext);
    let primerLetra = buscar.substring(0, 1).toUpperCase();
    let segundaLetra = buscar.substring(1).toLocaleLowerCase();
    let palabra = primerLetra.concat(segundaLetra);
    let buscando = resultado.filter((item) => item.data().name === palabra);
    let productosBuscados = [...buscando];

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

    if (loading) {
        return (
            <div style={estilos.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    } else {
        if (productosBuscados.length) {
            return (
                <div>
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
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </Div>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
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
                            {resultado.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <Card style={{ width: "14rem", minHeight: "500px" }}>
                                            <Card.Img variant="top" src={item.data().image} />
                                            <Card.Body>
                                                <Card.Title>🛒{item.data().name}</Card.Title>
                                                <Card.Text>▪ Precio: ${item.data().price}</Card.Text>
                                                {context.login && context.user.userId === "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                                                    <>
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
                                                        <br />
                                                    </>
                                                )}
                                                {context.login && context.user.userId !== "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
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
                                            </Card.Body>
                                        </Card>
                                    </div>
                                );
                            })}
                        </div>
                    </Div>
                    <Footer />
                </div>
            );
        }
    }
};

export default Productos;
