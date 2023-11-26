import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import firebase from "../Config/firebase";
import { estiloSpinner } from "../styles/estilosSpinner";
import { Div } from "../styles/StyledProductos";
import { BarraDeBusqueda } from "./BarraDeBusqueda";
import { CardProducts } from "./CardProducts";
import { Categorias } from "./Categorias";

export const Productos = () => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buscar, setBuscar] = useState("");
    const [masDatos, setMasDatos] = useState();
    const [cantidadProductosTotales, setCantidadProductosTotales] = useState(0);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

    const fetchMore = async () => {
        try {
            let query = firebase.firestore().collection("productos").orderBy("name", "asc").startAfter(masDatos).limit(8);

            if (categoriaSeleccionada) {
                query = query.where("category", "==", categoriaSeleccionada);
            }

            const querySnapshot = await query.get();

            const datos = querySnapshot.docs;
            const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];

            setResultado((prevResultado) => [...prevResultado, ...datos]);
            setMasDatos(otrosDatos);

            const totalQuerySnapshot = await firebase.firestore().collection("productos").get();
            const totalDatos = totalQuerySnapshot.docs;
            setCantidadProductosTotales(totalDatos.length);
        } catch (error) {
            console.error("Error al cargar más datos:", error);
        }
    };

    useEffect(() => {
        const cargarProductos = async () => {
            try {
                let query = firebase.firestore().collection("productos").limit(8).orderBy("name", "asc");

                if (categoriaSeleccionada && categoriaSeleccionada !== "Mostrar Todos") {
                    query = query.where("category", "==", categoriaSeleccionada);
                }

                const querySnapshot = await query.get();

                const datos = querySnapshot.docs;
                const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];

                setResultado(datos);
                setMasDatos(otrosDatos);
                setLoading(false);

                const totalQuerySnapshot = await firebase.firestore().collection("productos").get();
                const totalDatos = totalQuerySnapshot.docs;
                setCantidadProductosTotales(totalDatos.length);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
                setLoading(false); 
            }
        };

        cargarProductos();
    }, [categoriaSeleccionada]);

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
