import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <Container className="sidebar p-4" style={{ backgroundColor: '#333', color: '#fff' }}>
      {/* Logo */}
      <Row className="mb-4">
        <Col md={12} className="text-center">
          <img src="/path/to/your/logo.png" alt="Logo" className="logo" style={{ maxWidth: '150px' }} />
        </Col>
      </Row>
      {/* Menú */}
      <Row>
        <Col md={12}>
          <ul className="list-unstyled">
            <li>
              <Link to="/dashboard" className="btn btn-outline-light btn-lg btn-block mb-3">Dashboard</Link>
            </li>
            <li>
              <Link to="/empleados" className="btn btn-outline-light btn-lg btn-block mb-3">Empleados</Link>
            </li>
            <li>
              <Link to="/servicios" className="btn btn-outline-light btn-lg btn-block mb-3">Servicios</Link>
            </li>
            <li>
              <Link to="/turnos" className="btn btn-outline-light btn-lg btn-block mb-3">Turnos</Link>
            </li>
            <li>
              <Link to="/clientes" className="btn btn-outline-light btn-lg btn-block mb-3">Clientes</Link>
            </li>
            <li>
              <Link to="/usuarios" className="btn btn-outline-light btn-lg btn-block mb-3">Usuarios</Link>
            </li>
            <li>
              <Link to="/roles" className="btn btn-outline-light btn-lg btn-block mb-3">Roles</Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Sidebar;
