import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import "../styles/categorias.css";
import { useCategory } from "../hooks/useCategory";

export const Categorias = (props) => {
    const { categorias, loading } = useCategory();

    const handleCategoriaSeleccionada = (categoria) => {
        props.onCategoriaSeleccionada(categoria === "Mostrar Todos" ? "" : categoria);
    };

    return (
        <div style={{ display: "flex", gap: "30px" }}>
            <Dropdown>
                <Dropdown.Toggle style={{ backgroundColor: "transparent", color: "#000", borderColor: "transparent", margin: "0", padding: "0" }} id="dropdown-basic">
                    {loading ? "Cargando categorías..." : "Categorías"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {categorias &&
                        categorias.map((categoria, index) => (
                            <Dropdown.Item key={index} className={categoria === "Mostrar Todos" ? "mostrar-todos" : ""} onClick={() => handleCategoriaSeleccionada(categoria)}>
                                {categoria}
                            </Dropdown.Item>
                        ))}
                </Dropdown.Menu>
            </Dropdown>
            <p style={{ margin: "0" }}>Precio</p>
        </div>
    );
};
