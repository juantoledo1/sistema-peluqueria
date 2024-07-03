import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert, Table, Toast } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Usuarios = () => {
    const [showAgregarUsuarioModal, setShowAgregarUsuarioModal] = useState(false);
    const [showListarUsuariosModal, setShowListarUsuariosModal] = useState(false);
    const [showConfirmarEliminarModal, setShowConfirmarEliminarModal] = useState(false);
    const [showModificarUsuarioModal, setShowModificarUsuarioModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [roles, setRoles] = useState([]);
    const [idRol, setIdRol] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [usuarios, setUsuarios] = useState([]);
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        listarUsuarios();
        listarRoles();
    }, []);

    const handleAgregarUsuarioModal = () => setShowAgregarUsuarioModal(true);
    const handleCloseAgregarUsuarioModal = () => setShowAgregarUsuarioModal(false);

    const handleListarUsuariosModal = () => setShowListarUsuariosModal(true);
    const handleCloseListarUsuariosModal = () => setShowListarUsuariosModal(false);

    const handleConfirmarEliminarModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setShowConfirmarEliminarModal(true);
    };

    const handleCloseConfirmarEliminarModal = () => {
        setUsuarioSeleccionado(null);
        setShowConfirmarEliminarModal(false);
    };

    const handleModificarUsuarioModal = (usuario) => {
        setUsuarioSeleccionado(usuario);
        setNombre(usuario.nombre);
        setApellido(usuario.apellido);
        setCorreo(usuario.correo);
        setTelefono(usuario.telefono);
        setContrasena('');
        setIdRol(usuario.idRol);
        setShowModificarUsuarioModal(true);
    };

    const handleCloseModificarUsuarioModal = () => {
        setUsuarioSeleccionado(null);
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setContrasena('');
        setIdRol('');
        setShowModificarUsuarioModal(false);
    };

    const handleAgregarUsuario = async () => {
        try {
            const response = await axios.post('http://localhost:4000/crear_usuario', {
                nombre,
                apellido,
                correo,
                telefono,
                contrasena,
                idRol
            });
            console.log(response.data);
            setNombre('');
            setApellido('');
            setCorreo('');
            setTelefono('');
            setContrasena('');
            setIdRol('');
            handleCloseAgregarUsuarioModal();
            setToastMessage('El usuario se creó correctamente');
            setShowToast(true);
            setError('');
            listarUsuarios();
        } catch (error) {
            console.error('Error al agregar usuario:', error);
            setError('Error al agregar usuario');
            setMensaje('');
        }
    };

    const listarUsuarios = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listar_usuarios');
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de usuarios:', error);
        }
    };

    const listarRoles = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listar_roles');
            setRoles(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de roles:', error);
        }
    };

    const handleEliminarUsuario = async () => {
        try {
            const id_usuario = usuarioSeleccionado.id_usuario;
            const response = await axios.delete(`http://localhost:4000/eliminar_usuario/${id_usuario}`);
            console.log(response.data);
            setToastMessage('El usuario se eliminó correctamente');
            setShowToast(true);
            setError('');
            handleCloseConfirmarEliminarModal();
            listarUsuarios();
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            setError('Error al eliminar usuario');
            setMensaje('');
        }
    };

    const handleModificarUsuario = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/actualizar_usuario/${usuarioSeleccionado.id_usuario}`, {
                nombre,
                apellido,
                correo,
                telefono,
                contrasena,
                idRol
            });
            console.log(response.data);
            setToastMessage('El usuario se modificó correctamente');
            setShowToast(true);
            setError('');
            handleCloseModificarUsuarioModal();
            listarUsuarios();
        } catch (error) {
            console.error('Error al modificar usuario:', error);
            setError('Error al modificar usuario');
            setMensaje('');
        }
    };

    useEffect(() => {
        let timer;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false);
                setToastMessage('');
            }, 5000); // 5000 milisegundos = 5 segundos
        }
        return () => clearTimeout(timer);
    }, [showToast]);

    return (
        <>
            <CustomNavbar />
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2>Usuarios</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarUsuarioModal}>Agregar Usuario</Button>
                        <Button variant="info" size="lg" onClick={handleListarUsuariosModal}>Listar Usuarios</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarUsuario
                show={showAgregarUsuarioModal}
                handleClose={handleCloseAgregarUsuarioModal}
                handleAgregarUsuario={handleAgregarUsuario}
                nombre={nombre}
                setNombre={setNombre}
                apellido={apellido}
                setApellido={setApellido}
                correo={correo}
                setCorreo={setCorreo}
                telefono={telefono}
                setTelefono={setTelefono}
                contrasena={contrasena}
                setContrasena={setContrasena}
                roles={roles}
                idRol={idRol}
                setIdRol={setIdRol}
                error={error}
            />
            <ModalListarUsuarios
                show={showListarUsuariosModal}
                handleClose={handleCloseListarUsuariosModal}
                usuarios={usuarios}
                handleConfirmarEliminarModal={handleConfirmarEliminarModal}
                handleModificarUsuarioModal={handleModificarUsuarioModal}
            />
            <ModalConfirmarEliminarUsuario
                show={showConfirmarEliminarModal}
                handleClose={handleCloseConfirmarEliminarModal}
                usuarioSeleccionado={usuarioSeleccionado}
                handleEliminarUsuario={handleEliminarUsuario}
            />
            <ModalModificarUsuario
                show={showModificarUsuarioModal}
                handleClose={handleCloseModificarUsuarioModal}
                handleModificarUsuario={handleModificarUsuario}
                nombre={nombre}
                setNombre={setNombre}
                apellido={apellido}
                setApellido={setApellido}
                correo={correo}
                setCorreo={setCorreo}
                telefono={telefono}
                setTelefono={setTelefono}
                contrasena={contrasena}
                setContrasena={setContrasena}
                roles={roles}
                idRol={idRol}
                setIdRol={setIdRol}
                error={error}
            />

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-fixed bottom-0 start-50 translate-middle-x"
                style={{ zIndex: 9999 }}
                delay={5000} // Duración del toast en milisegundos
                autohide
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Mensaje</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        </>
    );
};

export default Usuarios;

// Componente ModalAgregarUsuario para agregar un nuevo usuario
const ModalAgregarUsuario = ({
    show,
    handleClose,
    handleAgregarUsuario,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    contrasena,
    setContrasena,
    roles,
    idRol,
    setIdRol,
    error
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese el correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="contrasena">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese la contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            as="select"
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleAgregarUsuario}>Agregar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalListarUsuarios para listar los usuarios
const ModalListarUsuarios = ({ show, handleClose, usuarios, handleConfirmarEliminarModal, handleModificarUsuarioModal }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Listar Usuarios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Rol</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuarios.map((usuario) => (
                            <tr key={usuario.id_usuario}>
                                <td>{usuario.id_usuario}</td>
                                <td>{usuario.nombre}</td>
                                <td>{usuario.apellido}</td>
                                <td>{usuario.correo}</td>
                                <td>{usuario.telefono}</td>
                                <td>{usuario.rol_nombre}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleModificarUsuarioModal(usuario)}>Modificar</Button>{' '}
                                    <Button variant="danger" onClick={() => handleConfirmarEliminarModal(usuario)}>Eliminar</Button>
                                </td>
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

// Componente ModalConfirmarEliminarUsuario para confirmar la eliminación de un usuario
const ModalConfirmarEliminarUsuario = ({ show, handleClose, usuarioSeleccionado, handleEliminarUsuario }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {usuarioSeleccionado && (
                    <p>¿Está seguro de que desea eliminar al usuario {usuarioSeleccionado.nombre} {usuarioSeleccionado.apellido}?</p>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleEliminarUsuario}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalModificarUsuario para modificar un usuario
const ModalModificarUsuario = ({
    show,
    handleClose,
    handleModificarUsuario,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    contrasena,
    setContrasena,
    roles,
    idRol,
    setIdRol,
    error
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Usuario</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="apellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el apellido"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="correo">
                        <Form.Label>Correo</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese el correo"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="telefono">
                        <Form.Label>Teléfono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese el teléfono"
                            value={telefono}
                            onChange={(e) => setTelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="contrasena">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese la contraseña"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="rol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Control
                            as="select"
                            value={idRol}
                            onChange={(e) => setIdRol(e.target.value)}
                        >
                            <option value="">Seleccione un rol</option>
                            {roles.map((rol) => (
                                <option key={rol.id_rol} value={rol.id_rol}>{rol.nombre}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {error && <Alert variant="danger">{error}</Alert>}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleModificarUsuario}>Modificar</Button>
            </Modal.Footer>
        </Modal>
    );
};
