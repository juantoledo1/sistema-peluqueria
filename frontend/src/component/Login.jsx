
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { login } from '../servicios/servicios';

const Login = () => {
    const [credentials, setCredentials] = useState({ user: '', pass: '' });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await login(credentials);
            if (response.status) {
                localStorage.setItem('token', response.token);
                // Redireccionar a la página principal u otra página después del inicio de sesión exitoso
                window.location.href = '/'; // Cambia la ruta según tu configuración
            } else {
                setError(response.mensaje);
            }
        } catch (error) {
            setError('Ocurrió un error al intentar iniciar sesión.');
        }
    };

    return (
        <Container className="mt-5">
            <h2>Iniciar sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control type="text" id="user" name="user" value={credentials.user} onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" id="pass" name="pass" value={credentials.pass} onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">Iniciar sesión</Button>
            </Form>
            <p className="mt-3">¿No tienes una cuenta? <Link to="/registro">Regístrate</Link></p>
        </Container>
    );
};

export default Login;

