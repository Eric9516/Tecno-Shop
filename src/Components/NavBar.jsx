import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";

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
    link: {
        color: "#000",
    },
};

const NavBar = () => {
    const context = useContext(AuthContext);
    let nombre = `${context.user.name} ${context.user.lastname}`;
    return (
        <div>
            <Navbar bg="dark" variant="dark" style={estilos.navBar}>
                <Navbar.Brand as={Link} to="/home" style={estilos.navBrand}>
                    TecnoShop
                </Navbar.Brand>
                <Nav>
                    <Nav.Link as={Link} to="/home">
                        Home
                    </Nav.Link>
                    {context.login && <div></div>}
                    {context.login && context.user.userId == "wFVGMZPsPlPw7wKmKNuOsfNofdx1" && (
                        <>
                            <Nav.Link as={Link} to="/producto/alta">
                                Agregar producto
                            </Nav.Link>

                            <NavDropdown title={nombre} id="nav-dropdown">
                                <Nav.Link as={Link} style={estilos.link} to={`/perfil/${context.user.userId}`}>
                                    Mi perfil
                                </Nav.Link>
                                <Nav.Link as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                    Cerrar sessión
                                </Nav.Link>
                            </NavDropdown>
                        </>
                    )}
                    {context.login && context.user.userId !== "wFVGMZPsPlPw7wKmKNuOsfNofdx1" && (
                        <>
                            <NavDropdown title={nombre} id="nav-dropdown">
                                <Nav.Link as={Link} style={estilos.link} to={`/perfil/${context.user.userId}`}>
                                    Mi perfil
                                </Nav.Link>
                                <Nav.Link as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                    Cerrar sessión
                                </Nav.Link>
                            </NavDropdown>
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
