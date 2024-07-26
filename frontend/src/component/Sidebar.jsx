import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Person, People, Calendar, Gear, FileEarmark } from 'react-bootstrap-icons';

const Sidebar = () => {
    return (
        <div className='container-fluid row'>
            <div className="vh-100 bg-dark text-light p-3 position-fixed col-2" style={{ marginTop: '60px' }}>
                <h4 className="d-none d-md-block m-2"></h4>
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/dashboard/clientes" className="text-light d-flex align-items-center">
                        <Person className="me-2" /><span className="d-none d-md-block">Clientes</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/empleados" className="text-light d-flex align-items-center">
                        <People className="me-2" /><span className="d-none d-md-block">Empleados</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/turnos" className="text-light d-flex align-items-center">
                        <Calendar className="me-2" /><span className="d-none d-md-block">Turnos</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/servicios" className="text-light d-flex align-items-center">
                        <Gear className="me-2" /><span className="d-none d-md-block">Servicios</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/usuarios" className="text-light d-flex align-items-center">
                        <Person className="me-2" /><span className="d-none d-md-block">Usuarios</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard/ganancias" className="text-light d-flex align-items-center">
                        <FileEarmark className="me-2" /><span className="d-none d-md-block">Ganancias</span>
                    </Nav.Link>
                </Nav>
            </div>
        </div>
    );
};

export default Sidebar;
