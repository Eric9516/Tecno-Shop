import React, { useEffect, useState } from "react";
import firebase from "../Config/firebase";
import Dropdown from "react-bootstrap/Dropdown";

export const Categorias = (props) => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const querySnapshot = await firebase.firestore().collection("productos").get();
                const datos = querySnapshot.docs;
                const categoriasProductos = datos.map((doc) => doc.data().category);
                const categoriasUnicas = ["Mostrar Todos", ...new Set(categoriasProductos)];
                setCategorias(categoriasUnicas);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        cargarCategorias();
    }, []);

    const handleCategoriaSeleccionada = (categoria) => {
        props.onCategoriaSeleccionada(categoria === "Mostrar Todos" ? "" : categoria);
    };

    return (
        <div style={{ display: "flex", gap: "30px" }}>
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "transparent", color: "#000", borderColor: "transparent", margin: "0", padding: "0" }} id="dropdown-basic">
                    Categorías
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {categorias.map((categoria, index) => (
                        <Dropdown.Item key={index} style={{ margin: "0", padding: "0" }} onClick={() => handleCategoriaSeleccionada(categoria)}>
                            {categoria}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>
            <p style={{ margin: "0" }}>Precio</p>
        </div>
    );
};
