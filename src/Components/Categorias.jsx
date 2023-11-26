import React, { useEffect, useState } from "react";
import firebase from "../Config/firebase";

export const Categorias = () => {
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const querySnapshot = await firebase.firestore().collection("productos").get();
                const datos = querySnapshot.docs;
                const categoriasProductos = datos.map((doc) => doc.data().category);
                const categoriasUnicas = [...new Set(categoriasProductos)];
                setCategorias(categoriasUnicas);
            } catch (error) {
                console.error("Error al cargar datos iniciales:", error);
            }
        };
        cargarCategorias();
    }, []);

    return (
        <div style={{ display: "flex", gap: "30px" }}>
            <details>
                <summary style={{ margin: "0" }}>Categorías</summary>
                {categorias.map((categoria, index) => (
                    <p key={index}>{categoria}</p>
                ))}
            </details>
            <p style={{ margin: "0" }}>Precio</p>
        </div>
    );
};
