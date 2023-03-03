import Form from "react-bootstrap/Form";
import styled from "styled-components";

export const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 80vw;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 960px) {
        width: 85%;
    }
`;

export const Input = styled(Form.Control)`
    width: 100%;
`;

export const DivBusqueda = styled.div`
    width: 50%;
    margin-left: auto;
    margin-right: auto;

    @media screen and (max-width: 960px) {
        width: 65%;
    }
`;
