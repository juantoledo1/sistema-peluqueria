import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar = ({ handleLogout }) => {
    return (
        <Navbar className='' bg="info" expand="lg" >
            <Navbar.Brand as={Link} to="/">Juan Toledo Peluquero</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/Dashboard">Panel</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link as={Link} to="/perfil">Perfil</Nav.Link>
                    <Button onClick={handleLogout} variant="outline-danger">Cerrar sesión</Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
