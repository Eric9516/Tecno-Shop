import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

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
    const context = useContext(AuthContext);
    return (
        <div>
            <Navbar bg="dark" variant="dark" style={estilos.navBar}>
                <Navbar.Brand href="#home" style={estilos.navBrand}>
                    VirtualShop
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    {context.login && (
                        <>
                            <Nav.Link as={Link} to="/producto/alta">
                                Agregar producto
                            </Nav.Link>
                        </>
                    )}
                    {!context.login && (
                        <>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/registro">
                                Registro
                            </Nav.Link>
                        </>
                    )}
                </Nav>
            </Navbar>
        </div>
    );
};

export default NavBar;
