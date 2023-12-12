import styled from "styled-components";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsCart3 } from "react-icons/bs";

export const NavLink = styled(Link)`
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    padding: 10px;
`;

export const DropDown = styled(NavDropdown)`
    font-weight: bold;
    padding: 2px;
    border-radius: 10px;
    transition: 0.5s;

    &:hover {
        background-color: #61dafb;
    }
`;

export const estilos = {
    navBar: {
        width: "100%",
        paddingTop: "15px",
        paddingBottom: "15px",
        // paddingLeft: "30px",
    },
    navBrand: {
        width: "60%",
    },
};

export const BsCart3Icon = styled(BsCart3)`
    font-size: 1.5em;
    color: #fff;
    margin-right: 10px;
    margin-left: 10px;

    &:hover {
        color: #61dafb;
    }
`;
