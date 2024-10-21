import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Asegúrate de estar utilizando React Router

const Registros = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setDni] = useState('');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [correo, setCorreo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook para la navegación

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:4000/crear_usuario', {
        nombre,
        apellido,
        dni,
        user,
        pass,
        correo,
      });
      setSuccess(response.data.mensaje);
    } catch (error) {
      console.error('Error registrando el usuario:', error);
      setError('Error registrando el usuario');
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login'); // Redirigir al login
  };

  return (
    <Container className="mt-5">
      <h2>Registrar Usuario</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="apellido">
          <Form.Label>Apellido:</Form.Label>
          <Form.Control
            type="text"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="dni">
          <Form.Label>DNI:</Form.Label>
          <Form.Control
            type="text"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="user">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="pass">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="correo">
          <Form.Label>Correo:</Form.Label>
          <Form.Control
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Registrar
        </Button>
        <Button variant="link" className="mt-3" onClick={handleLoginRedirect}>
          Ya tengo una cuenta, ir al login
        </Button>
      </Form>
    </Container>
  );
};

export default Registros;
