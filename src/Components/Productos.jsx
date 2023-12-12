import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { estiloSpinner } from "../styles/estilosSpinner";
import { useState } from "react";
import { Div } from "../styles/StyledProductos";
import { BarraDeBusqueda } from "./BarraDeBusqueda";
import { CardProducts } from "./CardProducts";
import { Categorias } from "./Categorias";
import { useProducts } from "../hooks/useProducts.js";

export const Productos = () => {
    const [buscar, setBuscar] = useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
    const { resultado, loading, fetchMore, cantidadProductosTotales } = useProducts(categoriaSeleccionada);

    const handleCategoriaSeleccionada = (categoria) => {
        setCategoriaSeleccionada(categoria === "Mostrar Todos" ? "" : categoria);
    };

    if (loading) {
        return (
            <div style={estiloSpinner.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    }

    return (
        <Div>
            <BarraDeBusqueda buscar={buscar} setBuscar={setBuscar} />
            <div className="col-lg-3 col-md-12">
                <Categorias onCategoriaSeleccionada={handleCategoriaSeleccionada} />
            </div>
            <div className="contenedor_padre">
                {resultado
                    .filter((item) => {
                        if (!categoriaSeleccionada || categoriaSeleccionada === "Mostrar Todos") {
                            return true;
                        }
                        return item.data().category === categoriaSeleccionada;
                    })
                    .filter((item) => item.data().name.toLowerCase().includes(buscar.toLowerCase()))
                    .map((item) => (
                        <CardProducts key={item.id} item={item} />
                    ))}
            </div>
            {cantidadProductosTotales !== resultado.length ? <Button onClick={fetchMore}>Mostrar mas</Button> : <h3>Nada mas para mostrar</h3>}
        </Div>
    );
};
