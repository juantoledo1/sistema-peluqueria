import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert, Row, Col } from 'react-bootstrap';
import { login } from '../servicios/servicios';

const Login = () => {
    const [credentials, setCredentials] = useState({ user: '', pass: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [navigate]);

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
                localStorage.setItem('isLoggedIn', 'true');
                navigate('/dashboard');
            } else {
                setError(response.mensaje);
            }
        } catch (error) {
            setError('Ocurrió un error al intentar iniciar sesión.');
        }
    };

    return (
        <Container className="mt-5 d-flex justify-content-center align-items-center ">
            <Row className="w-100 ">
                <Col md={6} lg={4} className="mx-auto">
                    <h2 className="text-center">Iniciar sesión</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre de usuario</Form.Label>
                            <Form.Control
                                type="text"
                                id="user"
                                name="user"
                                value={credentials.user}
                                onChange={handleChange}
                                placeholder="Ingrese su usuario"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                id="pass"
                                name="pass"
                                value={credentials.pass}
                                onChange={handleChange}
                                placeholder="Ingrese su contraseña"
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Iniciar sesión
                        </Button>
                    </Form>
                    <p className="mt-3 text-center">
                        ¿No tienes una cuenta? <Link to="/registros">Regístrate</Link>
                    </p>
                    <p className="text-center">
                        ¿Olvidaste tu contraseña? <Link to="/recuperar-contraseña">Recupérala aquí</Link>
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
