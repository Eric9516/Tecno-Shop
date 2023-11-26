import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import firebase from "../Config/firebase";

export const Carrito = () => {
    const usuarioId = "ID_DEL_USUARIO"; // Debes obtener el ID del usuario autenticado

    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        const obtenerCarrito = async () => {
            try {
                const carritoRef = firebase.firestore().collection("carritos").doc(usuarioId);
                const carritoData = (await carritoRef.get()).data() || {};

                // Convertir el objeto de productos del carrito a un array
                const productosEnCarrito = Object.values(carritoData);

                setCarrito(productosEnCarrito);
            } catch (error) {
                console.error("Error al obtener el carrito:", error);
            }
        };

        obtenerCarrito();
    }, [usuarioId]);

    return (
        <div>
            <h1>Carrito de Compras</h1>
            {carrito.map((producto) => (
                <Card key={producto.id} style={{ width: "300px", margin: "0 auto" }}>
                    <Card.Body>
                        <Card.Title>🛒{producto.name}</Card.Title>
                        <Card.Text>▪ Precio: ${producto.price}</Card.Text>
                        {/* Otras propiedades según tus necesidades */}
                    </Card.Body>
                </Card>
            ))}
            {carrito.length === 0 && <p>El carrito está vacío</p>}
            {/* Puedes agregar un botón para realizar la compra total */}
            <Button>
                <strong style={{ fontSize: "1.2em" }}>Comprar Todo</strong>
            </Button>
        </div>
    );
};
