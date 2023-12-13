import React, { useState } from "react";
import ColorPicker from "../Utils/ColorPicker";
import { useColorCustomization } from "../hooks/useColorCustomization";

export const PersonalizacionSitio = () => {
    const [selectedColorType, setSelectedColorType] = useState("navbarColor");

    const { changeColor } = useColorCustomization(selectedColorType);

    const handleColorChange = (newColor) => {
        changeColor(newColor);
    };

    return (
        <div style={{ marginLeft: "auto", marginRight: "auto", textAlign: "center" }}>
            <h3>Seleccioná el área para personalizar:</h3>
            <select value={selectedColorType} onChange={(e) => setSelectedColorType(e.target.value)}>
                <option value="navbarColor">Color de la barra de navegación</option>
                <option value="footerColor">Color del footer</option>
            </select>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <ColorPicker onColorChange={handleColorChange} />
            </div>
        </div>
    );
};
