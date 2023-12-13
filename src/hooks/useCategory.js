import { useState, useEffect } from "react";
import { auth, firestore, storage } from "../Config/firebase";

export const useCategory = () => {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const querySnapshot = await firestore.collection("productos").get();
                const datos = querySnapshot.docs;

                if (datos && datos.length > 0) {
                    const categoriasProductos = datos.map((doc) => doc.data().category);
                    const categoriasUnicas = ["Mostrar Todos", ...new Set(categoriasProductos)];
                    setCategorias(categoriasUnicas);
                } else {
                    console.log("No se encontraron productos.");
                }

                setLoading(false);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
                setCategorias([]);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { categorias, loading };
};
