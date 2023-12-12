import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Button } from "react-bootstrap";

const ColorPicker = ({ onColorChange }) => {
    const [color, setColor] = useState("#fff");

    const handleChange = (newColor) => {
        setColor(newColor.hex);
    };

    const applyColor = () => {
        onColorChange(color);
    };

    return (
        <div>
            <ChromePicker color={color} onChangeComplete={handleChange} />
            <Button onClick={applyColor}>Aplicar Color</Button>
        </div>
    );
};

export default ColorPicker;
