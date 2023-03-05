import { Input, DivBusqueda } from "../BarraDeBusqueda/StyledBarraDeBusqueda";
import { BsSearch } from "react-icons/bs";
import InputGroup from "react-bootstrap/InputGroup";

export const BarraDeBusqueda = ({ buscar, setBuscar }) => {
    return (
        <DivBusqueda>
            <InputGroup className="mb-3">
                <Input placeholder="Buscar productos" aria-label="Username" aria-describedby="basic-addon1" value={buscar} onChange={(e) => setBuscar(e.target.value)} />
                <InputGroup.Text>
                    <BsSearch size={"1.5em"} />
                </InputGroup.Text>
            </InputGroup>
        </DivBusqueda>
    );
};
