import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import NavDropdown from "react-bootstrap/NavDropdown";
import { MdComputer } from "react-icons/md";
import { NavLink, DropDown } from "../styles/navBar";

const estilos = {
    navBar: {
        paddingTop: "15px",
        paddingBottom: "15px",
        marginBottom: "30px",
        // paddingLeft: "30px",
    },
    navBrand: {
        width: "60%",
    },
};

const NavBar = () => {
    const context = useContext(AuthContext);
    let nombre = `${context.user.name} ${context.user.lastname}`;
    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={estilos.navBar} id="nav">
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
                            {context.login && context.user.userId === "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                                <>
                                    <NavLink as={Link} to="/producto/alta">
                                        Agregar producto
                                    </NavLink>

                                    <DropDown title={nombre} id="nav-dropdown" menuVariant="dark" active>
                                        <NavDropdown.Item as={Link} style={estilos.link} to={`/perfil/${context.user.userId}`}>
                                            Mi perfil
                                        </NavDropdown.Item>
                                        <NavDropdown.Item as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                            Cerrar sessión
                                        </NavDropdown.Item>
                                    </DropDown>
                                </>
                            )}
                            {context.login && context.user.userId !== "V74ntZ1jdFYqjYJedlDa4LrmozN2" && (
                                <>
                                    <DropDown title={nombre} id="nav-dropdown" menuVariant="dark" active>
                                        <Nav.Link as={Link} style={estilos.link} to={`/perfil/${context.user.userId}`}>
                                            Mi perfil
                                        </Nav.Link>
                                        <Nav.Link as={Link} onClick={context.handlerLogOut} style={estilos.link}>
                                            Cerrar sessión
                                        </Nav.Link>
                                    </DropDown>
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

export default NavBar;
