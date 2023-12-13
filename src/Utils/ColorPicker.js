import React, { useState } from "react";
import { ChromePicker } from "react-color";
import { Button, Alert } from "react-bootstrap";

const ColorPicker = ({ onColorChange }) => {
    const [color, setColor] = useState("#fff");
    const [showAlert, setShowAlert] = useState(false);

    const handleChange = (newColor) => {
        setColor(newColor.hex);
    };

    const applyColor = () => {
        onColorChange(color);
        setShowAlert(true);
    };

    return (
        <div style={{ marginTop: "20px" }}>
            {showAlert && (
                <Alert show={showAlert} variant="success" onClose={() => setShowAlert(false)} dismissible>
                    Color cambiado con éxito ✅
                </Alert>
            )}
            {!showAlert && (
                <div style={{ marginTop: "20px" }}>
                    <ChromePicker color={color} onChangeComplete={handleChange} />
                    <Button onClick={applyColor} style={{ marginTop: "15px" }}>
                        Aplicar Color
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ColorPicker;
