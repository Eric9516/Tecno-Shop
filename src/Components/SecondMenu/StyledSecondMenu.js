import styled from "styled-components";

export const Div = styled.div`
    width: 30vw;
`;

export const Ul = styled.ul`
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 500px) {
        flex-direction: column;
        gap: 20px;
    }
`;

export const Li = styled.li`
    list-style: none;
`;
