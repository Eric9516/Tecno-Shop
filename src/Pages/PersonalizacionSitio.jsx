import ColorPicker from "../Utils/ColorPicker";
import { useNavbarColor } from "../hooks/useNavbarColor";

export const PersonalizacionSitio = () => {
    const { changeNavbarColor } = useNavbarColor();
    return (
        <>
            <h3>Color de la barra de navegacion</h3>
            <ColorPicker onColorChange={changeNavbarColor} />
        </>
    );
};
