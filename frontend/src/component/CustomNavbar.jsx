import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const CustomNavbar = ({ handleLogout }) => {
    const [expanded, setExpanded] = useState(false);
    const navbarRef = useRef(null);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleClose = () => {
        setExpanded(false);
    };

    const handleClickOutside = (event) => {
        if (navbarRef.current && !navbarRef.current.contains(event.target)) {
            setExpanded(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <Navbar
            ref={navbarRef}
            bg="info"
            expand="lg"
            expanded={expanded}
            className="p-0"
            style={{ backgroundColor: expanded ? 'rgba(0, 123, 255, 0.5)' : 'info' }} // Color semi-transparente
        >
            <Navbar.Brand as={Link} to="/" className="d-lg-none">
                Juan Toledo Peluquero
            </Navbar.Brand>
            <div className="d-lg-none ml-auto">
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={handleToggle}
                    style={{ backgroundColor: 'rgba(0, 123, 255, 0.5)' }}
                />
            </div>
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                <Nav className="text-center">
                    <Nav.Link as={Link} to="/Dashboard" onClick={handleClose}>
                        Panel
                    </Nav.Link>
                </Nav>
                <Nav className="text-center">
                    <Nav.Link as={Link} to="/perfil" onClick={handleClose}>
                        Perfil
                    </Nav.Link>
                    <Button onClick={handleLogout} variant="outline-danger" className="ml-2">
                        Cerrar sesión
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default CustomNavbar;
