import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

const estilos = {
    navBar: {
        display: "flex",
        justifyContent: "space-evenly",
        marginBottom: "30px",
        // paddingLeft: "30px",
    },
    navBrand: {
        width: "60%",
    },
};

const NavBar = () => {
    return (
        <div>
            <Navbar bg="dark" variant="dark" style={estilos.navBar}>
                <Navbar.Brand href="#home" style={estilos.navBrand}>
                    VirtualShop
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={Link} to="/login">
                        Login
                    </Nav.Link>
                    <Nav.Link as={Link} to="/registro">
                        Registro
                    </Nav.Link>
                    <Nav.Link as={Link} to="/productos/alta">
                        Agregar producto
                    </Nav.Link>

                    <Nav.Link as={Link} to="/carrito">
                        Carrito
                    </Nav.Link>
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;
