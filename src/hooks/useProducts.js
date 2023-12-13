import { useState, useEffect } from "react";
import { auth, firestore, storage } from "../Config/firebase";

export const useProducts = (categoriaSeleccionada) => {
    const [resultado, setResultado] = useState([]);
    const [loading, setLoading] = useState(true);
    const [masDatos, setMasDatos] = useState();
    const [cantidadProductosTotales, setCantidadProductosTotales] = useState(0);

    const fetchMore = async () => {
        try {
            let query = firestore.collection("productos").orderBy("name", "asc").startAfter(masDatos).limit(8);

            if (categoriaSeleccionada) {
                query = query.where("category", "==", categoriaSeleccionada);
            }

            const querySnapshot = await query.get();

            const nuevosDatos = querySnapshot.docs;
            const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];

            setResultado((prevResultado) => [...prevResultado, ...nuevosDatos]);
            setMasDatos(otrosDatos);

            const totalQuerySnapshot = await firestore().collection("productos").get();
            const totalDatos = totalQuerySnapshot.docs;
            setCantidadProductosTotales(totalDatos.length);
        } catch (error) {
            console.error("Error al cargar más datos:", error);
        }
    };

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                let query = firestore.collection("productos").limit(8).orderBy("name", "asc");

                if (categoriaSeleccionada && categoriaSeleccionada !== "Mostrar Todos") {
                    query = query.where("category", "==", categoriaSeleccionada);
                }

                const querySnapshot = await query.get();

                const datos = querySnapshot.docs;
                const otrosDatos = querySnapshot.docs[querySnapshot.docs.length - 1];

                setResultado(datos);
                setMasDatos(otrosDatos);
                setLoading(false);

                const totalQuerySnapshot = await firestore.collection("productos").get();
                const totalDatos = totalQuerySnapshot.docs;
                setCantidadProductosTotales(totalDatos.length);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
                setLoading(false);
            }
        };
        fetchProductos();
    }, [categoriaSeleccionada]);

    return { resultado, loading, fetchMore, cantidadProductosTotales };
};
