import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdComputer } from "react-icons/md";
import { NavLink, DropDown, estilos, BsCart3Icon } from "../styles/StyledNavBar";
import { AuthContext } from "../Context/AuthContext";
import { useNavbarColor } from "../hooks/useNavbarColor";

export const NavBar = () => {
    const context = useContext(AuthContext);
    const { name, lastname, userId } = context.user;
    const isLogged = context.login && name === "Eric" && lastname === "Cantoni";
    const { navbarStyle } = useNavbarColor();

    useEffect(()=> {
        
    })

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" style={{ ...estilos.navBar, ...navbarStyle }} id="nav">
                <Container>
                    <Navbar.Brand as={Link} to="/home">
                        TecnoShop <MdComputer size={"1.5em"} />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Dropdown" id="collasible-nav-dropdown" hidden>
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavLink as={Link} to="/home">
                                Home
                            </NavLink>
                            {isLogged && (
                                <>
                                    <NavLink as={Link} to="/producto/alta">
                                        Agregar producto
                                    </NavLink>
                                    <Nav.Link as={Link} to="/carrito">
                                        <BsCart3Icon />
                                    </Nav.Link>
                                    <DropDown title={`${name + " " + lastname}`} id="nav-dropdown" menuVariant="dark" active>
                                        <NavDropdown.Item as={Link} style={estilos.link} to={`/perfil/${userId}`}>
                                            Mi perfil
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} style={estilos.link} to={`/estilos/${userId}`}>
                                            Personalización del sitio
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                            Cerrar sessión
                                        </NavDropdown.Item>
                                    </DropDown>
                                </>
                            )}
                            {context.login && !isLogged && (
                                <>
                                    <Nav.Link as={Link} to="/carrito">
                                        <BsCart3Icon />
                                    </Nav.Link>
                                    <DropDown title={`${name + " " + lastname}`} id="nav-dropdown" menuVariant="dark" active>
                                        <Nav.Link as={Link} style={estilos.link} to={`/perfil/${userId}`}>
                                            Mi perfil
                                        </Nav.Link>
                                        <Nav.Link as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                            Cerrar sessión
                                        </Nav.Link>
                                    </DropDown>{" "}
                                </>
                            )}
                            {!context.login && (
                                <>
                                    <NavLink as={Link} to="/login">
                                        Login
                                    </NavLink>
                                    <NavLink as={Link} to="/registro">
                                        Registro
                                    </NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};
