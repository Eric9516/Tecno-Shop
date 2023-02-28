import styled from "styled-components";

export const DivFooter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding: 40px;
    background-color: #212529;
    margin-top: 50px;
`;

export const DivContenedor = styled.div`
    width: 70vw;
    display: flex;
    flex-direction: column;

    @media screen and (max-width: 960px) {
        width: 100vw;
        justify-content: center;
        align-items: center;
    }
`;

export const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

export const Redes = styled.div`
    display: flex;
    gap: 25px;

    @media screen and (max-width: 960px) {
        padding-top: 15px;
    }
`;

export const Div1 = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-evenly;

    @media screen and (max-width: 960px) {
        padding: 20px;
        flex-direction: column;
        gap: 25px;
        margin-bottom: 10px;
    }
`;

export const Div2 = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;

export const A = styled.a`
    text-decoration: none;
    color: #fff;
`;

export const H5 = styled.h5`
    color: #fff;
`;
