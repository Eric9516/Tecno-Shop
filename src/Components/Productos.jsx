import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { estiloSpinner } from "../styles/estilosSpinner";
import { Div } from "../styles/StyledProductos";
import { BarraDeBusqueda } from "./BarraDeBusqueda";
import { CardProducts } from "./CardProducts";
import { Categorias } from "./Categorias";
import { useProducts } from "../hooks/useProducts.js";

export const Productos = () => {
    const { resultado, loading, fetchMore, cantidadProductosTotales } = useProducts();
    const [buscar, setBuscar] = React.useState("");
    const [categoriaSeleccionada, setCategoriaSeleccionada] = React.useState("");

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
            <Categorias onCategoriaSeleccionada={setCategoriaSeleccionada} />
            <div className="contenedor_padre">
                {resultado
                    .filter((item) => {
                        if (categoriaSeleccionada === "" || categoriaSeleccionada === "Mostrar Todos") {
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
