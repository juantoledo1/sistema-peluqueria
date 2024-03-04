import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <div style={{ background: 'linear-gradient(45deg, #FF8C00, #FF6347)', minHeight: '100vh' }}>
      <Container className="py-5">
        <Row className="justify-content-center text-center">
          <Col md={8} className="text-white">
            <h1 className="mb-4">¡Bienvenido a Genit!</h1>
            <p className="lead mb-4">
              Descubre una experiencia única  de gestion de peluqueria
            </p>
            <Row className="justify-content-center">
              <Col md={4} className="mb-3">
                <Button as={Link} to="/registros" variant="light" block="true">
                  Registrarse
                </Button>
                <p className="text-white mt-2">¿Eres nuevo? Regístrate y comienza a disfrutar de nuestros servicios.</p>
              </Col>
              <Col md={4} className="mb-3">
                <Button as={Link} to="/login" variant="light" block="true">
                  Iniciar sesión
                </Button>
                <p className="text-white mt-2">¿Ya eres cliente? Inicia sesión para reservar tu próximo corte.</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
