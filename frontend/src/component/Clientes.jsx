import React, { useState } from 'react';
import { Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Clientes = () => {
    const [showAgregarModal, setShowAgregarModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [clientes, setClientes] = useState([]);
    const [error, setError] = useState('');

    const handleAgregarModal = () => setShowAgregarModal(true);
    const handleCloseAgregarModal = () => setShowAgregarModal(false);

    const handleAgregarCliente = async () => {
        try {
            if (!nombre || !apellido || !correo || !telefono) {
                setError('Por favor complete todos los campos.');
                return;
            }

            if (!/^\d+$/.test(telefono)) {
                setError('El teléfono debe contener solo números.');
                return;
            }

            const response = await axios.post('http://localhost:4000/crear_cliente', {
                nombre,
                apellido,
                correo,
                telefono
            });
            console.log(response.data);
            setNombre('');
            setApellido('');
            setCorreo('');
            setTelefono('');
            handleCloseAgregarModal();
            setMensaje('El cliente se creó correctamente');
            setError('');
            listarClientes();
        } catch (error) {
            console.error('Error al agregar cliente:', error);
            setError('Error al agregar cliente');
            setMensaje('');
        }
    };

    const listarClientes = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listar_clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2>Clientes</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarModal}>Agregar Cliente</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarCliente
                show={showAgregarModal}
                handleClose={handleCloseAgregarModal}
                handleAgregarCliente={handleAgregarCliente}
                nombre={nombre}
                setNombre={setNombre}
                apellido={apellido}
                setApellido={setApellido}
                correo={correo}
                setCorreo={setCorreo}
                telefono={telefono}
                setTelefono={setTelefono}
                error={error}
            />
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
        </>
    );
};

export default Clientes;

// Componente ModalAgregarCliente para agregar un nuevo cliente
const ModalAgregarCliente = ({
    show,
    handleClose,
    handleAgregarCliente,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    error
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCorreo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese el correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTelefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleAgregarCliente}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};
