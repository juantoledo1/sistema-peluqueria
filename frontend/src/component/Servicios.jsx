import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert, Table, Toast } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Servicios = () => {
    const [showAgregarServicioModal, setShowAgregarServicioModal] = useState(false);
    const [showListarServiciosModal, setShowListarServiciosModal] = useState(false);
    const [showConfirmarEliminarModal, setShowConfirmarEliminarModal] = useState(false);
    const [showModificarServicioModal, setShowModificarServicioModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [precio, setPrecio] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
    const [error, setError] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    useEffect(() => {
        listarServicios();
    }, []);

    const handleAgregarServicioModal = () => setShowAgregarServicioModal(true);
    const handleCloseAgregarServicioModal = () => setShowAgregarServicioModal(false);

    const handleListarServiciosModal = () => setShowListarServiciosModal(true);
    const handleCloseListarServiciosModal = () => setShowListarServiciosModal(false);

    const handleConfirmarEliminarModal = (servicio) => {
        setServicioSeleccionado(servicio);
        setShowConfirmarEliminarModal(true);
    };

    const handleCloseConfirmarEliminarModal = () => {
        setServicioSeleccionado(null);
        setShowConfirmarEliminarModal(false);
    };

    const handleModificarServicioModal = (servicio) => {
        setServicioSeleccionado(servicio);
        setNombre(servicio.nombre);
        setDescripcion(servicio.descripcion);
        setPrecio(servicio.precio);
        setShowModificarServicioModal(true);
    };

    const handleCloseModificarServicioModal = () => {
        setServicioSeleccionado(null);
        setNombre('');
        setDescripcion('');
        setPrecio('');
        setShowModificarServicioModal(false);
    };

    const handleAgregarServicio = async () => {
        try {
            const response = await axios.post('http://localhost:4000/crear_servicio', {
                nombre,
                descripcion,
                precio
            });
            console.log(response.data);
            setNombre('');
            setDescripcion('');
            setPrecio('');
            handleCloseAgregarServicioModal();
            setToastMessage('El servicio se creó correctamente');
            setShowToast(true);
            setError('');
            listarServicios();
        } catch (error) {
            console.error('Error al agregar servicio:', error);
            setError('Error al agregar servicio');
            setMensaje('');
        }
    };

    const listarServicios = async () => {
        try {
            const response = await axios.get('http://localhost:4000/listar_servicios');
            setServicios(response.data);
        } catch (error) {
            console.error('Error al obtener la lista de servicios:', error);
        }
    };

    const handleEliminarServicio = async () => {
        try {
            const id_servicio = servicioSeleccionado.id_servicio;
            const response = await axios.delete(`http://localhost:4000/eliminar_servicio/${id_servicio}`);
            console.log(response.data);
            setToastMessage('El servicio se eliminó correctamente');
            setShowToast(true);
            setError('');
            handleCloseConfirmarEliminarModal();
            listarServicios();
        } catch (error) {
            console.error('Error al eliminar servicio:', error);
            setError('Error al eliminar servicio');
            setMensaje('');
        }
    };

    const handleModificarServicio = async () => {
        try {
            const response = await axios.put(`http://localhost:4000/actualizar_servicio/${servicioSeleccionado.id_servicio}`, {
                nombre,
                descripcion,
                precio
            });
            console.log(response.data);
            setToastMessage('El servicio se modificó correctamente');
            setShowToast(true);
            setError('');
            handleCloseModificarServicioModal();
            listarServicios();
        } catch (error) {
            console.error('Error al modificar servicio:', error);
            setError('Error al modificar servicio');
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
                    <h2>Servicios</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarServicioModal}>Agregar Servicio</Button>
                        <Button variant="info" size="lg" onClick={handleListarServiciosModal}>Listar Servicios</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarServicio
                show={showAgregarServicioModal}
                handleClose={handleCloseAgregarServicioModal}
                handleAgregarServicio={handleAgregarServicio}
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                precio={precio}
                setPrecio={setPrecio}
                error={error}
            />
            <ModalListarServicios
                show={showListarServiciosModal}
                handleClose={handleCloseListarServiciosModal}
                servicios={servicios}
                handleConfirmarEliminarModal={handleConfirmarEliminarModal}
                handleModificarServicioModal={handleModificarServicioModal}
            />
            <ModalConfirmarEliminarServicio
                show={showConfirmarEliminarModal}
                handleClose={handleCloseConfirmarEliminarModal}
                servicioSeleccionado={servicioSeleccionado}
                handleEliminarServicio={handleEliminarServicio}
            />
            <ModalModificarServicio
                show={showModificarServicioModal}
                handleClose={handleCloseModificarServicioModal}
                handleModificarServicio={handleModificarServicio}
                nombre={nombre}
                setNombre={setNombre}
                descripcion={descripcion}
                setDescripcion={setDescripcion}
                precio={precio}
                setPrecio={setPrecio}
                error={error}
            />

            <Toast
                show={showToast}
                onClose={() => setShowToast(false)}
                className="position-fixed top-0 start-50 translate-middle-x"
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

export default Servicios;

// Componente ModalAgregarServicio para agregar un nuevo servicio
const ModalAgregarServicio = ({
    show,
    handleClose,
    handleAgregarServicio,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    error
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar Servicio</Modal.Title>
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

                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleAgregarServicio}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalListarServicios para mostrar todos los servicios
const ModalListarServicios = ({ show, handleClose, servicios, handleConfirmarEliminarModal, handleModificarServicioModal }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Lista de Servicios</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Precio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {servicios.map((servicio) => (
                            <tr key={servicio.id_servicio}>
                                <td>{servicio.id_servicio}</td>
                                <td>{servicio.nombre}</td>
                                <td>{servicio.descripcion}</td>
                                <td>{servicio.precio}</td>
                                <td>
                                    <Button variant="warning" onClick={() => handleModificarServicioModal(servicio)}>Modificar</Button>{' '}
                                    <Button variant="danger" onClick={() => handleConfirmarEliminarModal(servicio)}>Eliminar</Button>
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

// Componente ModalConfirmarEliminarServicio para confirmar la eliminación de un servicio
const ModalConfirmarEliminarServicio = ({ show, handleClose, servicioSeleccionado, handleEliminarServicio }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Está seguro de que desea eliminar el servicio <strong>{servicioSeleccionado?.nombre}</strong>?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleEliminarServicio}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};

// Componente ModalModificarServicio para modificar un servicio existente
const ModalModificarServicio = ({
    show,
    handleClose,
    handleModificarServicio,
    nombre,
    setNombre,
    descripcion,
    setDescripcion,
    precio,
    setPrecio,
    error
}) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modificar Servicio</Modal.Title>
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

                    <Form.Group className="mb-3" controlId="formDescripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese la descripción"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPrecio">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Ingrese el precio"
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                        />
                    </Form.Group>
                </Form>
                {error && <p className="text-danger">{error}</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="primary" onClick={handleModificarServicio}>Guardar</Button>
            </Modal.Footer>
        </Modal>
    );
};
