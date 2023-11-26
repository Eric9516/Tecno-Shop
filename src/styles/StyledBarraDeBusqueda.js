import styled from "styled-components";
import Form from "react-bootstrap/Form";

export const Input = styled(Form.Control)`
    width: 100%;
`;

export const DivBusqueda = styled.div`
    width: 40%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 960px) {
        width: 100%;
    }
`;
