import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

import img from "../img/publicidades/publicidad.jpg";
import img2 from "../img/publicidades/publicidad2.jpg";
import img3 from "../img/publicidades/publicidad3.jpg";

export const Carrusel = () => {
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
                <img className="d-block w-100" src={img2} alt="Second slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img className="d-block w-100" src={img3} alt="Second slide" />
            </Carousel.Item>
        </Carousel>
    );
};
