import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Empleados = () => {
    const [showAgregarModal, setShowAgregarModal] = useState(false);
    const [showListarModal, setShowListarModal] = useState(false);
    const [showEliminarModal, setShowEliminarModal] = useState(false);
    const [showModificarModal, setShowModificarModal] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        listarEmpleados();
    }, []);

    const handleAgregarModal = () => setShowAgregarModal(true);
    const handleCloseAgregarModal = () => setShowAgregarModal(false);

    const handleListarModal = () => setShowListarModal(true);
    const handleCloseListarModal = () => setShowListarModal(false);

    const handleEliminarModal = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setShowEliminarModal(true);
    };
    const handleCloseEliminarModal = () => setShowEliminarModal(false);

    const handleModificarModal = (empleado) => {
        setEmpleadoSeleccionado(empleado);
        setShowModificarModal(true);
    };
    const handleCloseModificarModal = () => setShowModificarModal(false);

    const handleAgregarEmpleado = async () => {
        if (!nombre || !apellido || !correo || !telefono) {
            setError('Todos los campos son obligatorios');
            return;
        }

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
            handleCloseAgregarModal();
            setMensaje('El empleado se creó correctamente');
            setError('');
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

    const eliminarEmpleado = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:4000/eliminar_empleado/${id}`);
            console.log(response.data);
            handleCloseEliminarModal();
            setMensaje('El empleado se eliminó correctamente');
            setError('');
            listarEmpleados();
        } catch (error) {
            console.error('Error al eliminar empleado:', error);
            setError('Error al eliminar empleado');
            setMensaje('');
        }
    };

    const modificarEmpleado = async (id) => {
        if (!nombre || !apellido || !correo || !telefono) {
            setError('Todos los campos son obligatorios');
            return;
        }

        try {
            const response = await axios.put(`http://localhost:4000/modificar_empleado/${id}`, {
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
            handleCloseModificarModal();
            setMensaje('El empleado se modificó correctamente');
            setError('');
            listarEmpleados();
        } catch (error) {
            console.error('Error al modificar empleado:', error);
            setError('Error al modificar empleado');
            setMensaje('');
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2>Empleados</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarModal}>Agregar Empleado</Button>
                        <Button variant="info" size="lg" onClick={handleListarModal}>Listar Empleados</Button>
                        <Button variant="danger" size="lg" onClick={() => handleEliminarModal(empleadoSeleccionado)}>Eliminar Empleado</Button>
                        <Button variant="warning" size="lg" onClick={() => handleModificarModal(empleadoSeleccionado)}>Modificar Empleado</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarEmpleado
                show={showAgregarModal}
                handleClose={handleCloseAgregarModal}
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
                show={showListarModal}
                handleClose={handleCloseListarModal}
                empleados={empleados}
            />
            <ModalEliminarEmpleado
                show={showEliminarModal}
                handleClose={handleCloseEliminarModal}
                empleadoSeleccionado={empleadoSeleccionado}
                eliminarEmpleado={eliminarEmpleado}
            />
            <ModalModificarEmpleado
                show={showModificarModal}
                handleClose={handleCloseModificarModal}
                empleadoSeleccionado={empleadoSeleccionado}
                nombre={nombre}
                setNombre={setNombre}
                apellido={apellido}
                setApellido={setApellido}
                correo={correo}
                setCorreo={setCorreo}
                telefono={telefono}
                setTelefono={setTelefono}
                error={error}
                modificarEmpleado={modificarEmpleado}
            />
            {mensaje && <Alert variant="success">{mensaje}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
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
const ModalListarEmpleados = ({ show, handleClose, empleados }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Listado de Empleados</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.map((empleado, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{empleado.nombre}</td>
                                <td>{empleado.apellido}</td>
                                <td>{empleado.correo}</td>
                                <td>{empleado.telefono}</td>
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

// Componente ModalEliminarEmpleado para eliminar un empleado por su ID
const ModalEliminarEmpleado = ({ show, handleClose, empleadoSeleccionado, eliminarEmpleado }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Eliminar Empleado</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Estás seguro que deseas eliminar al empleado {empleadoSeleccionado && empleadoSeleccionado.nombre}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={() => eliminarEmpleado(empleadoSeleccionado.id)}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalModificarEmpleado para modificar un empleado por su ID
const ModalModificarEmpleado = ({
    show,
    handleClose,
    empleadoSeleccionado,
    nombre,
    setNombre,
    apellido,
    setApellido,
    correo,
    setCorreo,
    telefono,
    setTelefono,
    error,
    modificarEmpleado
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
                <Button variant="primary" onClick={() => modificarEmpleado(empleadoSeleccionado.id)}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};


