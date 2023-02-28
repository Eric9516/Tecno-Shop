import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import "../styles/estilos.css";
import img from "../img/publicidades/publicidad.jpg";

const Carrusel = () => {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect} style={{ marginBottom: "50px" }}>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img} alt="Second slide" />
            </Carousel.Item>
        </Carousel>
    );
};

export default Carrusel;
