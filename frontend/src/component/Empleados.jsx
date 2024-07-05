import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert, Table, Toast } from 'react-bootstrap';
// import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Empleados = () => {
    const [showAgregarEmpleadoModal, setShowAgregarEmpleadoModal] = useState(false);
    const [showListarEmpleadosModal, setShowListarEmpleadosModal] = useState(false);
    const [showConfirmarEliminarModal, setShowConfirmarEliminarModal] = useState(false);
    const [showModificarEmpleadoModal, setShowModificarEmpleadoModal] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        listarEmpleados();
    }, []);

    const handleAgregarEmpleadoModal = () => setShowAgregarEmpleadoModal(true);
    const handleCloseAgregarEmpleadoModal = () => setShowAgregarEmpleadoModal(false);

    const handleListarEmpleadosModal = () => setShowListarEmpleadosModal(true);
    const handleCloseListarEmpleadosModal = () => setShowListarEmpleadosModal(false);

    const handleConfirmarEliminarModal = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setShowConfirmarEliminarModal(true);
    };

    const handleCloseConfirmarEliminarModal = () => {
        setEmpleadoSeleccionado(null);
        setShowConfirmarEliminarModal(false);
    };

    const handleModificarEmpleadoModal = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setNombre(empleado.nombre);
        setApellido(empleado.apellido);
        setCorreo(empleado.correo);
        setTelefono(empleado.telefono);
        setShowModificarEmpleadoModal(true);
    };

    const handleCloseModificarEmpleadoModal = () => {
        setEmpleadoSeleccionado(null);
        setNombre('');
        setApellido('');
        setCorreo('');
        setTelefono('');
        setShowModificarEmpleadoModal(false);
    };

    const handleAgregarEmpleado = async () => {
        try {
            const response = await axios.post('http://localhost:4000/crear_empleado', {
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
            handleCloseAgregarEmpleadoModal();
            setToastMessage('El empleado se creó correctamente');
            setShowToast(true);
            listarEmpleados();
        } catch (error) {
            console.error('Error al agregar empleado:', error);
            setError('Error al agregar empleado');
            setMensaje('');
        }
    };

    const listarEmpleados = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listar_empleados');
            setEmpleados(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de empleados:', error);
        }
    };

    const handleEliminarEmpleado = async () => {
        try {
            const id_empleado = empleadoSeleccionado.id_empleado;
            const response = await axios.delete(`http://localhost:4000/eliminar_empleado/${id_empleado}`);
            console.log(response.data);
            setToastMessage('El empleado se eliminó correctamente');
            setShowToast(true);
            handleCloseConfirmarEliminarModal();
            listarEmpleados();
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            setError('Error al eliminar empleado');
            setMensaje('');
        }
    };

    const handleModificarEmpleado = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/actualizar_empleado/${empleadoSeleccionado.id_empleado}`, {
                nombre,
                apellido,
                correo,
                telefono
            });
            console.log(response.data);
            setToastMessage('El empleado se modificó correctamente');
            setShowToast(true);
            handleCloseModificarEmpleadoModal();
            listarEmpleados();
        } catch (error) {
            console.error('Error al modificar empleado:', error);
            setError('Error al modificar empleado');
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
            {/* <CustomNavbar /> */}
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2 className='text-center'>Empleados</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarEmpleadoModal}>Agregar Empleado</Button>
                        <Button variant="info" size="lg" onClick={handleListarEmpleadosModal}>Listar Empleados</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarEmpleado
                show={showAgregarEmpleadoModal}
                handleClose={handleCloseAgregarEmpleadoModal}
                handleAgregarEmpleado={handleAgregarEmpleado}
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
            <ModalListarEmpleados
                show={showListarEmpleadosModal}
                handleClose={handleCloseListarEmpleadosModal}
                empleados={empleados}
                handleConfirmarEliminarModal={handleConfirmarEliminarModal}
                handleModificarEmpleadoModal={handleModificarEmpleadoModal}
            />
            <ModalConfirmarEliminarEmpleado
                show={showConfirmarEliminarModal}
                handleClose={handleCloseConfirmarEliminarModal}
                empleadoSeleccionado={empleadoSeleccionado}
                handleEliminarEmpleado={handleEliminarEmpleado}
            />
            <ModalModificarEmpleado
                show={showModificarEmpleadoModal}
                handleClose={handleCloseModificarEmpleadoModal}
                handleModificarEmpleado={handleModificarEmpleado}
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
            
            {/* Toast para mensajes */}
            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-fixed top-0 start-50 translate-middle-x bg-black text-light"
                style={{ zIndex: 9999 }}
                delay={5000} // Duración del toast en milisegundos
                autohide
            >
                <Toast.Header closeButton={false}>
                    <strong className="me-auto">Mensaje</strong>
                </Toast.Header>
                <Toast.Body>{toastMessage}</Toast.Body>
            </Toast>

            {/* Mensajes de Alerta */}
            {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
        </>
    );
};

export default Empleados;

// Componente ModalAgregarEmpleado para agregar un nuevo empleado
const ModalAgregarEmpleado = ({
    show,
    handleClose,
    handleAgregarEmpleado,
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
                <Modal.Title>Agregar Empleado</Modal.Title>
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
                <Button variant="primary" onClick={handleAgregarEmpleado}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalListarEmpleados para mostrar todos los empleados
const ModalListarEmpleados = ({ show, handleClose, empleados, handleConfirmarEliminarModal, handleModificarEmpleadoModal }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Listado de Empleados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover responsive className="table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado) => (
                            <tr key={empleado.id_empleado}>
                                <td>{empleado.id_empleado}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.correo}</td>
                                <td>{empleado.telefono}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleModificarEmpleadoModal(empleado)}>Modificar</Button>{' '}
                                    <Button variant="danger" onClick={() => handleConfirmarEliminarModal(empleado)}>Eliminar</Button>
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

// Componente ModalConfirmarEliminarEmpleado para confirmar la eliminación de un empleado
const ModalConfirmarEliminarEmpleado = ({ show, handleClose, empleadoSeleccionado, handleEliminarEmpleado }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro de eliminar al empleado {empleadoSeleccionado?.nombre} {empleadoSeleccionado?.apellido}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleEliminarEmpleado}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalModificarEmpleado para modificar un empleado existente
const ModalModificarEmpleado = ({
    show,
    handleClose,
    handleModificarEmpleado,
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
                <Modal.Title>Modificar Empleado</Modal.Title>
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
                <Button variant="primary" onClick={handleModificarEmpleado}>Guardar Cambios</Button>
            </Modal.Footer>
        </Modal>
    );
};
