
import React, { useState } from 'react';
import { Container, Button, Modal, Table } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Clientes = () => {
    const [showAgregarModal, setShowAgregarModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showListarModal, setShowListarModal] = useState(false);
    const [clientes, setClientes] = useState([]);

    const handleAgregarModal = () => setShowAgregarModal(true);
    const handleCloseAgregarModal = () => setShowAgregarModal(false);

    const handleEditarModal = () => setShowEditarModal(true);
    const handleCloseEditarModal = () => setShowEditarModal(false);

    const handleEliminarModal = () => setShowEliminarModal(true);
    const handleCloseEliminarModal = () => setShowEliminarModal(false);

    const handleListarModal = async () => {
        setShowListarModal(true);
        try {
            const response = await axios.get('http://localhost:4000/listar_clientes');
            setClientes(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
        }
    };
    const handleCloseListarModal = () => setShowListarModal(false);

    return (
        <>
            <CustomNavbar />
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2>Clientes</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarModal}>Agregar Cliente</Button>
                        <Button variant="primary" size="lg" onClick={handleEditarModal}>Editar Cliente</Button>
                        <Button variant="danger" size="lg" onClick={handleEliminarModal}>Eliminar Cliente</Button>
                        <Button variant="info" size="lg" onClick={handleListarModal}>Listar Clientes</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarCliente show={showAgregarModal} handleClose={handleCloseAgregarModal} />
            <ModalEditarCliente show={showEditarModal} handleClose={handleCloseEditarModal} />
            <ModalEliminarCliente show={showEliminarModal} handleClose={handleCloseEliminarModal} />
            <ModalListarClientes show={showListarModal} handleClose={handleCloseListarModal} clientes={clientes} />
        </>
    );
};

export default Clientes;

// Componente ModalAgregarCliente para agregar un nuevo cliente
const ModalAgregarCliente = ({ show, handleClose }) => {
    // Aquí iría el formulario para agregar un nuevo cliente
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Aquí iría el formulario para agregar un nuevo cliente */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleClose}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalEditarCliente para editar un cliente existente
const ModalEditarCliente = ({ show, handleClose }) => {
    // Aquí iría el formulario para editar un cliente
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Aquí iría el formulario para editar un cliente */}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleClose}>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalEliminarCliente para eliminar un cliente
const ModalEliminarCliente = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                ¿Estás seguro de que quieres eliminar este cliente?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleClose}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalListarClientes para mostrar la lista de clientes
const ModalListarClientes = ({ show, handleClose, clientes }) => {
    return (
        <Modal show={show} onHide={handleClose} className="modal-xl"> {/* Agrega la clase modal-xl para hacer el modal más ancho */}
            <Modal.Header closeButton>
                <Modal.Title>Listar Clientes</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map(cliente => (
                            <tr key={cliente.id_cliente}>
                                <td>{cliente.id_cliente}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.correo}</td>
                                <td>{cliente.telefono}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
            </Modal.Footer>
        </Modal>
    );
};
