import styled from "styled-components";
import { FormControl, Form, Button } from "react-bootstrap";

export const Div = styled.div`
    width: 30%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
    border-radius: 15px;
    background-color: #c7bacb;
    box-shadow: 0px 0px 7px 3px #444;

    @media screen and (min-width: 1600px) {
        //pantallas grandes
        width: 25%;
        height: 55vh;
    }
    @media screen and (max-width: 960px) {
        width: 60%;
        height: 77vh;
    }
    @media screen and (max-width: 500px) {
        width: 85%;
    }
    @media screen and (max-width: 400px) {
        width: 85%;
        height: 85vh;
        margin-bottom: 20px;
    }
    @media screen and (max-width: 300px) {
        width: 85%;
        height: 75vh;
    }
    @media screen and (min-height: 700px) {
        height: 60vh;
    }
`;

export const Formulario = styled(Form)`
    width: 85%;
`;

export const Input = styled(FormControl)`
    background-color: #385273;
    width: 100%;
    padding: 10px;
    color: #fff;

    ::placeholder {
        color: #fff;
    }
`;

export const Boton = styled(Button)`
    width: 100%;
    margin-bottom: 15px;
`;

export const Titulo = styled.div`
    width: 100%;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const H2 = styled.h2`
    color: #0d6efd;

    @media screen and (min-width: 1600px) {
        //pantallas grandes
        margin: 0;
    }
`;

export const P = styled.p`
    cursor: pointer;
    font-weight: 500;
    color: #0d6efd;
`;
