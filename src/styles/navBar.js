import styled from "styled-components";
import { Link } from "react-router-dom";
import NavDropdown from "react-bootstrap/NavDropdown";

export const NavLink = styled(Link)`
    font-weight: bold;
    color: #fff;
    text-decoration: none;
    padding: 10px;

    &:hover {
        color: #61dafb;
    }
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
