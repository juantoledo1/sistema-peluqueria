import React, { useState, useEffect } from 'react';
import { Button, Modal, Table, Alert, Toast } from 'react-bootstrap';
import axios from 'axios';

const Usuarios = () => {
    const [showListarUsuariosModal, setShowListarUsuariosModal] = useState(false);
    const [usuarios, setUsuarios] = useState([]);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedUsuarioId, setSelectedUsuarioId] = useState(null);
    const [newRole, setNewRole] = useState(null);

    useEffect(() => {
        if (showListarUsuariosModal) {
            listarUsuarios();
        }
    }, [showListarUsuariosModal]);

    const handleListarUsuariosModal = () => {
        setShowListarUsuariosModal(true);
    };

    const handleCloseListarUsuariosModal = () => {
        setShowListarUsuariosModal(false);
        setError('');
    };

    const listarUsuarios = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:4000/listar_usuarios', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
            setError('Error al obtener la lista de usuarios');
        }
    };

    const handleConfirmCambiarRol = (usuarioId, nuevoRolId) => {
        setSelectedUsuarioId(usuarioId);
        setNewRole(nuevoRolId);
        setShowConfirmModal(true);
    };

    const handleCambiarRol = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:4000/cambiar_rol/${selectedUsuarioId}`, {
                rol_id: newRole
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setToastMessage(response.data.mensaje);
            setShowToast(true);
            listarUsuarios();
            setShowConfirmModal(false);
        } catch (error) {
            console.error('Error al cambiar el rol del usuario:', error);
            setToastMessage('Error al cambiar el rol del usuario');
            setShowToast(true);
        }
    };

    useEffect(() => {
        let timer;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false);
                setToastMessage('');
            }, 5000);
        }
        return () => clearTimeout(timer);
    }, [showToast]);

    return (
        <>
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <div>
                    <h2 className='text-center'>Usuarios</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="info" size="lg" onClick={handleListarUsuariosModal}>Listar Usuarios</Button>
                    </div>
                </div>
            </div>

            <Modal show={showListarUsuariosModal} onHide={handleCloseListarUsuariosModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Listar Usuarios</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {usuarios.length === 0 ? (
                        <Alert variant="info">No hay usuarios para mostrar.</Alert>
                    ) : (
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.usuario_id}>
                                        <td>{usuario.usuario_id}</td>
                                        <td>{usuario.nombre}</td>
                                        <td>{usuario.apellido}</td>
                                        <td>{usuario.correo}</td>
                                        <td>
                                            {usuario.rol_id === 1 ? (
                                                <Button variant="primary" onClick={() => handleConfirmCambiarRol(usuario.usuario_id, 2)}>
                                                    Cambiar a Admin 2
                                                </Button>
                                            ) : (
                                                <Button variant="primary" onClick={() => handleConfirmCambiarRol(usuario.usuario_id, 1)}>
                                                    Cambiar a Admin 1
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseListarUsuariosModal}>Cerrar</Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Cambio de Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Realmente desea cambiar el rol de este usuario?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>Cancelar</Button>
                    <Button variant="primary" onClick={handleCambiarRol}>Confirmar</Button>
                </Modal.Footer>
            </Modal>

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-fixed top-0 start-50 translate-middle-x bg-black text-light"
                style={{ zIndex: 9999 }}
                delay={5000}
                autohide
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Mensaje</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        </>
    );
};

export default Usuarios;
