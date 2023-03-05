import React, { useState } from "react";
import { Div, Ul, Li } from "./StyledSecondMenu";

export const SecondMenu = () => {
    const [precio, setPrecio] = useState("");
    console.log(precio);
    return (
        <Div>
            <Ul>
                <Li>
                    <select>
                        <option disabled selected>
                            Precio
                        </option>
                        <option value="2">Menor a mayor</option>
                        <option value="3">Mayor a menor</option>
                    </select>
                </Li>
                <Li>
                    <select onChange={() => setPrecio()}>
                        <option disabled selected>
                            Categoría
                        </option>
                        <option value="2">Audio y video</option>
                        <option value="3">Notebooks</option>
                        <option value="3">Cpu</option>
                        <option value="3">Componentes</option>
                    </select>
                </Li>
                <Li>
                    <select>
                        <option disabled selected>
                            Condicion
                        </option>
                        <option value="2">Nuevo</option>
                        <option value="3">Usado</option>
                    </select>
                </Li>
            </Ul>
            <hr />
        </Div>
    );
};
