import React from "react";
import { Carrusel } from "../Components/Carrusel";
import { Footer } from "../Components/Footer";
import { Productos } from "../Components/Productos";

export const Home = () => {
    return (
        <div>
            <Carrusel />
            <Productos />
            <Footer />
        </div>
    );
};
