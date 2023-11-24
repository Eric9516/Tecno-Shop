import React, { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import firebase from "../../Config/firebase";
import { estiloSpinner } from "./estilosSpinner";
import { Div } from "./StyledProductos";
import { BarraDeBusqueda } from "../BarraDeBusqueda";
import { CardProducts } from "../CardProducts";

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
                .limit(8)
                .orderBy("name", "asc")
                .get()
                .then((querySnapshot) => {
                    const datos = querySnapshot.docs;
                    const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];
                    setResultado(datos);
                    setMasDatos(otrosDatos);
                    setLoading(false);
                });
        };
        response();
    }, []);

    const buscando = resultado.filter((item) => {
        const products = item.data().name.toString().toLowerCase().includes(buscar.toLowerCase());
        return products;
    });
    const productosBuscados = [...buscando];

    const fetchMore = () => {
        firebase
            .firestore()
            .collection("productos")
            .orderBy("name", "asc")
            .startAfter(masDatos)
            .limit(8)
            .get()
            .then((querySnapshot) => {
                const datos = querySnapshot.docs;
                const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];
                setResultado((resultado) => [...resultado, ...datos]);
                setMasDatos(otrosDatos);
            });
    };

    if (loading) {
        return (
            <div style={estiloSpinner.spinner}>
                <Spinner animation="grow" />
                {"Cargando"}
            </div>
        );
    } else {
        return (
            <>
                <Div>
                    <BarraDeBusqueda buscar={buscar} setBuscar={setBuscar} />
                    <div className="contenedor_padre">
                        {productosBuscados.map((item) => {
                            return <CardProducts item={item} />;
                        })}
                    </div>
                    <Button onClick={fetchMore}>Mostrar mas</Button>
                </Div>
            </>
        );
    }
};
