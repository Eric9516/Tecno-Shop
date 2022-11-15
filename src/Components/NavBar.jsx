import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";

const estilos = {
    navBar: {
        marginBottom: "30px",
    },
};

const NavBar = () => {
    return (
        <div style={estilos.navBar}>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">VirtualShop</Navbar.Brand>
                    <Nav className="me-auto">
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
                    </Nav>
                </Container>
            </Navbar>
        </div>
    );
};

export default NavBar;
