// import React, { useState, useEffect } from 'react';
// import { Container, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
// import CustomNavbar from './CustomNavbar';
// import axios from 'axios';

// const Clientes = () => {
//     const [showAgregarModal, setShowAgregarModal] = useState(false);
//     const [showListarModal, setShowListarModal] = useState(false);
//     const [showEliminarModal, setShowEliminarModal] = useState(false);
//     const [showModificarModal, setShowModificarModal] = useState(false);
//     const [nombre, setNombre] = useState('');
//     const [apellido, setApellido] = useState('');
//     const [correo, setCorreo] = useState('');
//     const [telefono, setTelefono] = useState('');
//     const [mensaje, setMensaje] = useState('');
//     const [clientes, setClientes] = useState([]);
//     const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         listarClientes();
//     }, []);

//     const handleAgregarModal = () => {
//         setMensaje('');
//         setError('');
//         setShowAgregarModal(true);
//     };

//     const handleCloseAgregarModal = () => setShowAgregarModal(false);

//     const handleListarModal = () => {
//         setMensaje('');
//         setError('');
//         setShowListarModal(true);
//     };

//     const handleCloseListarModal = () => setShowListarModal(false);

//     const handleEliminarModal = (cliente) => {
//         setClienteSeleccionado(cliente);
//         setShowEliminarModal(true);
//     };

//     const handleCloseEliminarModal = () => {
//         setClienteSeleccionado(null);
//         setShowEliminarModal(false);
//     };

//     const handleModificarModal = (cliente) => {
//         setClienteSeleccionado(cliente);
//         setNombre(cliente.nombre);
//         setApellido(cliente.apellido);
//         setCorreo(cliente.correo);
//         setTelefono(cliente.telefono);
//         setShowModificarModal(true);
//     };

//     const handleCloseModificarModal = () => {
//         setClienteSeleccionado(null);
//         setShowModificarModal(false);
//     };

//     const handleAgregarCliente = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/crear_cliente', {
//                 nombre,
//                 apellido,
//                 correo,
//                 telefono
//             });
//             console.log(response.data);
//             setNombre('');
//             setApellido('');
//             setCorreo('');
//             setTelefono('');
//             handleCloseAgregarModal();
//             setMensaje('El cliente se creó correctamente');
//             setError('');
//             listarClientes();
//         } catch (error) {
//             console.error('Error al agregar cliente:', error);
//             setError('Error al agregar cliente');
//             setMensaje('');
//         }
//     };

//     const listarClientes = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/listar_clientes');
//             setClientes(response.data);
//         } catch (error) {
//             console.error('Error al obtener la lista de clientes:', error);
//         }
//     };

//     const eliminarCliente = async () => {
//         try {
//             const response = await axios.delete(`http://localhost:4000/eliminar_cliente/${clienteSeleccionado.id}`);
//             console.log(response.data);
//             handleCloseEliminarModal();
//             setMensaje('El cliente se eliminó correctamente');
//             setError('');
//             listarClientes();
//         } catch (error) {
//             console.error('Error al eliminar cliente:', error);
//             setError('Error al eliminar cliente');
//             setMensaje('');
//         }
//     };

//     const modificarCliente = async () => {
//         try {
//             const response = await axios.put(`http://localhost:4000/modificar_cliente/${clienteSeleccionado.id}`, {
//                 nombre,
//                 apellido,
//                 correo,
//                 telefono
//             });
//             console.log(response.data);
//             setNombre('');
//             setApellido('');
//             setCorreo('');
//             setTelefono('');
//             handleCloseModificarModal();
//             setMensaje('El cliente se modificó correctamente');
//             setError('');
//             listarClientes();
//         } catch (error) {
//             console.error('Error al modificar cliente:', error);
//             setError('Error al modificar cliente');
//             setMensaje('');
//         }
//     };

//     return (
//         <>
//             <CustomNavbar />
//             <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
//                 <Container>
//                     <h2>Clientes</h2>
//                     <div className="d-grid gap-2 mb-3">
//                         <Button variant="success" size="lg" onClick={handleAgregarModal}>Agregar Cliente</Button>
//                         <Button variant="info" size="lg" onClick={handleListarModal}>Listar Clientes</Button>
//                     </div>
//                 </Container>
//             </div>

//             {/* Modales */}
//             <ModalAgregarCliente
//                 show={showAgregarModal}
//                 handleClose={handleCloseAgregarModal}
//                 handleAgregarCliente={handleAgregarCliente}
//                 nombre={nombre}
//                 setNombre={setNombre}
//                 apellido={apellido}
//                 setApellido={setApellido}
//                 correo={correo}
//                 setCorreo={setCorreo}
//                 telefono={telefono}
//                 setTelefono={setTelefono}
//                 error={error}
//             />
//             <ModalListarClientes
//                 show={showListarModal}
//                 handleClose={handleCloseListarModal}
//                 clientes={clientes}
//                 handleEliminarModal={handleEliminarModal}
//                 handleModificarModal={handleModificarModal}
//             />
//             <ModalEliminarCliente
//                 show={showEliminarModal}
//                 handleClose={handleCloseEliminarModal}
//                 clienteSeleccionado={clienteSeleccionado}
//                 eliminarCliente={eliminarCliente}
//             />
//             <ModalModificarCliente
//                 show={showModificarModal}
//                 handleClose={handleCloseModificarModal}
//                 clienteSeleccionado={clienteSeleccionado}
//                 nombre={nombre}
//                 setNombre={setNombre}
//                 apellido={apellido}
//                 setApellido={setApellido}
//                 correo={correo}
//                 setCorreo={setCorreo}
//                 telefono={telefono}
//                 setTelefono={setTelefono}
//                 error={error}
//                 modificarCliente={modificarCliente}
//             />
//             {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
//             {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
//         </>
//     );
// };

// export default Clientes;

// // Componente ModalAgregarCliente para agregar un nuevo cliente
// const ModalAgregarCliente = ({
//     show,
//     handleClose,
//     handleAgregarCliente,
//     nombre,
//     setNombre,
//     apellido,
//     setApellido,
//     correo,
//     setCorreo,
//     telefono,
//     setTelefono,
//     error
// }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Agregar Cliente</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="formNombre">
//                         <Form.Label>Nombre</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el nombre"
//                             value={nombre}
//                             onChange={(e) => setNombre(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formApellido">
//                         <Form.Label>Apellido</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el apellido"
//                             value={apellido}
//                             onChange={(e) => setApellido(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formCorreo">
//                         <Form.Label>Correo</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Ingrese el correo"
//                             value={correo}
//                             onChange={(e) => setCorreo(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formTelefono">
//                         <Form.Label>Teléfono</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el teléfono"
//                             value={telefono}
//                             onChange={(e) => setTelefono(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Form>
//                 {error && <p className="text-danger">{error}</p>}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
//                 <Button variant="primary" onClick={handleAgregarCliente}>Guardar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// // Componente ModalListarClientes para mostrar todos los clientes
// const ModalListarClientes = ({ show, handleClose, clientes, handleEliminarModal, handleModificarModal }) => {
//     return (
//         <Modal show={show} onHide={handleClose} size="lg">
//             <Modal.Header closeButton>
//                 <Modal.Title>Listado de Clientes</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>ID</th>
//                             <th>Nombre</th>
//                             <th>Apellido</th>
//                             <th>Correo</th>
//                             <th>Teléfono</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {clientes.map((cliente) => (
//                             <tr key={cliente.id}>
//                                 <td>{cliente.id}</td>
//                                 <td>{cliente.nombre}</td>
//                                 <td>{cliente.apellido}</td>
//                                 <td>{cliente.correo}</td>
//                                 <td>{cliente.telefono}</td>
//                                 <td>
//                                     <Button variant="danger" onClick={() => handleEliminarModal(cliente)}>Eliminar</Button>{' '}
//                                     <Button variant="warning" onClick={() => handleModificarModal(cliente)}>Modificar</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// // Componente ModalEliminarCliente para eliminar un cliente por su ID
// const ModalEliminarCliente = ({ show, handleClose, clienteSeleccionado, eliminarCliente }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Eliminar Cliente</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>¿Estás seguro que deseas eliminar al cliente {clienteSeleccionado && clienteSeleccionado.nombre}?</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
//                 <Button variant="danger" onClick={eliminarCliente}>Eliminar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// // Componente ModalModificarCliente para modificar un cliente por su ID
// const ModalModificarCliente = ({
//     show,
//     handleClose,
//     clienteSeleccionado,
//     nombre,
//     setNombre,
//     apellido,
//     setApellido,
//     correo,
//     setCorreo,
//     telefono,
//     setTelefono,
//     error,
//     modificarCliente
// }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Modificar Cliente</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="formNombre">
//                         <Form.Label>Nombre</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el nombre"
//                             value={nombre}
//                             onChange={(e) => setNombre(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formApellido">
//                         <Form.Label>Apellido</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el apellido"
//                             value={apellido}
//                             onChange={(e) => setApellido(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formCorreo">
//                         <Form.Label>Correo</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Ingrese el correo"
//                             value={correo}
//                             onChange={(e) => setCorreo(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formTelefono">
//                         <Form.Label>Teléfono</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el teléfono"
//                             value={telefono}
//                             onChange={(e) => setTelefono(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Form>
//                 {error && <p className="text-danger">{error}</p>}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
//                 <Button variant="primary" onClick={modificarCliente}>Guardar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };















// import React, { useState, useEffect } from 'react';
// import { Container, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
// import CustomNavbar from './CustomNavbar';
// import axios from 'axios';

// const Usuarios = () => {
//     const [showAgregarClienteModal, setShowAgregarClienteModal] = useState(false);
//     const [showListarClientesModal, setShowListarClientesModal] = useState(false);
//     const [showConfirmarEliminarModal, setShowConfirmarEliminarModal] = useState(false);
//     const [nombre, setNombre] = useState('');
//     const [apellido, setApellido] = useState('');
//     const [correo, setCorreo] = useState('');
//     const [telefono, setTelefono] = useState('');
//     const [mensaje, setMensaje] = useState('');
//     const [clientes, setClientes] = useState([]);
//     const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         listarClientes();
//     }, []);

//     const handleAgregarClienteModal = () => {
//         setMensaje('');
//         setError('');
//         setShowAgregarClienteModal(true);
//     };

//     const handleCloseAgregarClienteModal = () => setShowAgregarClienteModal(false);

//     const handleListarClientesModal = () => {
//         setMensaje('');
//         setError('');
//         setShowListarClientesModal(true);
//     };

//     const handleCloseListarClientesModal = () => setShowListarClientesModal(false);

//     const handleConfirmarEliminarModal = (cliente) => {
//         setClienteSeleccionado(cliente);
//         setShowConfirmarEliminarModal(true);
//     };

//     const handleCloseConfirmarEliminarModal = () => setShowConfirmarEliminarModal(false);

//     const handleAgregarCliente = async () => {
//         try {
//             const response = await axios.post('http://localhost:4000/crear_cliente', {
//                 nombre,
//                 apellido,
//                 correo,
//                 telefono
//             });
//             console.log(response.data);
//             setNombre('');
//             setApellido('');
//             setCorreo('');
//             setTelefono('');
//             handleCloseAgregarClienteModal();
//             setMensaje('El cliente se creó correctamente');
//             setError('');
//             listarClientes();
//         } catch (error) {
//             console.error('Error al agregar cliente:', error);
//             setError('Error al agregar cliente');
//             setMensaje('');
//         }
//     };

//     const listarClientes = async () => {
//         try {
//             const response = await axios.get('http://localhost:4000/listar_clientes');
//             setClientes(response.data);
//         } catch (error) {
//             console.error('Error al obtener la lista de clientes:', error);
//         }
//     };

//     const handleEliminarCliente = async () => {
//     try {
//         const clienteId = clienteSeleccionado.id;
//         const response = await axios.delete(`http://localhost:4000/eliminar_cliente/${clienteId}`);
//         console.log(response.data);
//         setMensaje('El cliente se eliminó correctamente');
//         setError('');
//         handleCloseConfirmarEliminarModal();
//         listarClientes(); // Actualizar la lista de clientes después de eliminar
//     } catch (error) {
//         console.error('Error al eliminar cliente:', error);
//         setError('Error al eliminar cliente');
//         setMensaje('');
//     }
// };

//     const handleModificarCliente = (cliente) => {
//         console.log('Modificar cliente:', cliente);
//         // Implementa la lógica para modificar el cliente
//     };

//     const handleAgregarTurno = async (cliente) => {
//         try {
//             // Implementa la lógica para agregar un turno para el cliente seleccionado
//             // Por ejemplo:
//             // const response = await axios.post(`http://localhost:4000/agregar_turno/${cliente.id}`, {
//             //     fecha: new Date()
//             // });
//             // Asumiendo que el backend tenga una ruta 'agregar_turno' que acepte el clienteId y fecha

//             // Simulación de éxito
//             setMensaje('Turno agregado correctamente');
//             setError('');
//             setShowListarClientesModal(false); // Cerrar modal de listar clientes después de agregar turno
//             listarClientes(); // Actualizar la lista de clientes
//         } catch (error) {
//             console.error('Error al agregar turno:', error);
//             setError('Error al agregar turno');
//             setMensaje('');
//         }
//     };

//     return (
//         <>
//             <CustomNavbar />
//             <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
//                 <Container>
//                     <h2>Usuarios</h2>
//                     <div className="d-grid gap-2 mb-3">
//                         <Button variant="success" size="lg" onClick={handleAgregarClienteModal}>Agregar Cliente</Button>
//                         <Button variant="info" size="lg" onClick={handleListarClientesModal}>Listar Clientes</Button>
//                     </div>
//                 </Container>
//             </div>

//             {/* Modales */}
//             <ModalAgregarCliente
//                 show={showAgregarClienteModal}
//                 handleClose={handleCloseAgregarClienteModal}
//                 handleAgregarCliente={handleAgregarCliente}
//                 nombre={nombre}
//                 setNombre={setNombre}
//                 apellido={apellido}
//                 setApellido={setApellido}
//                 correo={correo}
//                 setCorreo={setCorreo}
//                 telefono={telefono}
//                 setTelefono={setTelefono}
//                 error={error}
//             />
//             <ModalListarClientes
//                 show={showListarClientesModal}
//                 handleClose={handleCloseListarClientesModal}
//                 clientes={clientes}
//                 handleConfirmarEliminarModal={handleConfirmarEliminarModal}
//                 handleModificarCliente={handleModificarCliente}
//                 handleAgregarTurno={handleAgregarTurno}
//             />
//             <ModalConfirmarEliminarCliente
//                 show={showConfirmarEliminarModal}
//                 handleClose={handleCloseConfirmarEliminarModal}
//                 clienteSeleccionado={clienteSeleccionado}
//                 handleEliminarCliente={handleEliminarCliente}
//             />
//             {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
//             {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
//         </>
//     );
// };

// export default Usuarios;

// // Componente ModalAgregarCliente para agregar un nuevo cliente
// const ModalAgregarCliente = ({
//     show,
//     handleClose,
//     handleAgregarCliente,
//     nombre,
//     setNombre,
//     apellido,
//     setApellido,
//     correo,
//     setCorreo,
//     telefono,
//     setTelefono,
//     error
// }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Agregar Cliente</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group className="mb-3" controlId="formNombre">
//                         <Form.Label>Nombre</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el nombre"
//                             value={nombre}
//                             onChange={(e) => setNombre(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formApellido">
//                         <Form.Label>Apellido</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el apellido"
//                             value={apellido}
//                             onChange={(e) => setApellido(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formCorreo">
//                         <Form.Label>Correo</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Ingrese el correo"
//                             value={correo}
//                             onChange={(e) => setCorreo(e.target.value)}
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formTelefono">
//                         <Form.Label>Teléfono</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Ingrese el teléfono"
//                             value={telefono}
//                             onChange={(e) => setTelefono(e.target.value)}
//                         />
//                     </Form.Group>
//                 </Form>
//                 {error && <p className="text-danger">{error}</p>}
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
//                 <Button variant="primary" onClick={handleAgregarCliente}>Guardar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// // Componente ModalListarClientes para mostrar todos los clientes
// const ModalListarClientes = ({ show, handleClose, clientes, handleConfirmarEliminarModal, handleModificarCliente, handleAgregarTurno }) => {
//     return (
//         <Modal show={show} onHide={handleClose} size="lg">
//             <Modal.Header closeButton>
//                 <Modal.Title>Listado de Clientes</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Table striped bordered hover>
//                     <thead>
//                         <tr>
//                             <th>Nombre</th>
//                             <th>Apellido</th>
//                             <th>Correo</th>
//                             <th>Teléfono</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {clientes.map((cliente) => (
//                             <tr key={cliente.id}>
//                                 <td>{cliente.nombre}</td>
//                                 <td>{cliente.apellido}</td>
//                                 <td>{cliente.correo}</td>
//                                 <td>{cliente.telefono}</td>
//                                 <td>
//                                     <Button variant="danger" onClick={() => handleConfirmarEliminarModal(cliente)}>Eliminar</Button>{' '}
//                                     <Button variant="info" onClick={() => handleModificarCliente(cliente)}>Modificar</Button>{' '}
//                                     <Button variant="success" onClick={() => handleAgregarTurno(cliente)}>Agregar Turno</Button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </Table>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// // Componente ModalConfirmarEliminarCliente para confirmar la eliminación de un cliente
// const ModalConfirmarEliminarCliente = ({ show, handleClose, clienteSeleccionado, handleEliminarCliente }) => {
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Confirmar Eliminación</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <p>¿Está seguro que desea eliminar al cliente {clienteSeleccionado ? `${clienteSeleccionado.nombre} ${clienteSeleccionado.apellido}` : ''}?</p>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
//                 <Button variant="danger" onClick={handleEliminarCliente}>Eliminar</Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import CustomNavbar from './CustomNavbar';
import axios from 'axios';

const Clientes = () => {
    const [showAgregarClienteModal, setShowAgregarClienteModal] = useState(false);
    const [showListarClientesModal, setShowListarClientesModal] = useState(false);
    const [showConfirmarEliminarModal, setShowConfirmarEliminarModal] = useState(false);
    const [id, setId] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [clientes, setClientes] = useState([]);
    const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        listarClientes();
    }, []);

    const handleAgregarClienteModal = () => setShowAgregarClienteModal(true);
    const handleCloseAgregarClienteModal = () => setShowAgregarClienteModal(false);

    const handleListarClientesModal = () => setShowListarClientesModal(true);
    const handleCloseListarClientesModal = () => setShowListarClientesModal(false);

    const handleConfirmarEliminarModal = (cliente) => {
        setClienteSeleccionado(cliente);
        setShowConfirmarEliminarModal(true);
    };

    const handleCloseConfirmarEliminarModal = () => {
        setClienteSeleccionado(null);
        setShowConfirmarEliminarModal(false);
    };

    const handleAgregarCliente = async () => {
        try {
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
            handleCloseAgregarClienteModal();
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
            setClientes(response.data); // Aquí se espera que la respuesta sea un array de objetos con propiedades como id, nombre, apellido, correo, telefono
        } catch (error) {
            console.error('Error al obtener la lista de clientes:', error);
        }
    };

    const handleEliminarCliente = async () => {
        try {
            const id_cliente = clienteSeleccionado.id_cliente;
            const response = await axios.delete(`http://localhost:4000/eliminar_cliente/${id_cliente}`);
            console.log(response.data);
            setMensaje('El cliente se eliminó correctamente');
            setError('');
            handleCloseConfirmarEliminarModal();
            listarClientes(); // Actualizar la lista de clientes después de eliminar
        } catch (error) {
            console.error('Error al eliminar cliente:', error);
            setError('Error al eliminar cliente');
            setMensaje('');
        }
    };

    const handleModificarCliente = (cliente) => {
        console.log('Modificar cliente:', cliente);
        // Implementa la lógica para modificar el cliente
    };

    const handleAgregarTurno = async (cliente) => {
        try {
            // Implementa la lógica para agregar un turno para el cliente seleccionado
            // Por ejemplo:
            // const response = await axios.post(`http://localhost:4000/agregar_turno/${cliente.id}`, {
            //     fecha: new Date()
            // });
            // Asumiendo que el backend tenga una ruta 'agregar_turno' que acepte el clienteId y fecha

            // Simulación de éxito
            setMensaje('Turno agregado correctamente');
            setError('');
            setShowListarClientesModal(false); // Cerrar modal de listar clientes después de agregar turno
            listarClientes(); // Actualizar la lista de clientes
        } catch (error) {
            console.error('Error al agregar turno:', error);
            setError('Error al agregar turno');
            setMensaje('');
        }
    };

    return (
        <>
            <CustomNavbar />
            <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
                <Container>
                    <h2>Clientes</h2>
                    <div className="d-grid gap-2 mb-3">
                        <Button variant="success" size="lg" onClick={handleAgregarClienteModal}>Agregar Cliente</Button>
                        <Button variant="info" size="lg" onClick={handleListarClientesModal}>Listar Clientes</Button>
                    </div>
                </Container>
            </div>

            {/* Modales */}
            <ModalAgregarCliente
                show={showAgregarClienteModal}
                handleClose={handleCloseAgregarClienteModal}
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
            <ModalListarClientes
                show={showListarClientesModal}
                handleClose={handleCloseListarClientesModal}
                clientes={clientes}
                handleConfirmarEliminarModal={handleConfirmarEliminarModal}
                handleModificarCliente={handleModificarCliente}
                handleAgregarTurno={handleAgregarTurno}
            />
            <ModalConfirmarEliminarCliente
                show={showConfirmarEliminarModal}
                handleClose={handleCloseConfirmarEliminarModal}
                clienteSeleccionado={clienteSeleccionado}
                handleEliminarCliente={handleEliminarCliente}
            />
            {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
            {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
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

// Componente ModalListarClientes para mostrar todos los clientes
const ModalListarClientes = ({ show, handleClose, clientes, handleConfirmarEliminarModal, handleModificarCliente, handleAgregarTurno }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>Listado de Clientes</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Table striped bordered hover responsive className="table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th> {/* Asegúrate de tener esta columna aquí */}
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Correo</th>
                            <th>Teléfono</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.id_cliente}</td> {/* Mostrar el ID del cliente */}
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.correo}</td>
                                <td>{cliente.telefono}</td>
                                <td className="d-flex justify-content-between align-items-center">
                                    <Button variant="danger" onClick={() => handleConfirmarEliminarModal(cliente)}>Eliminar</Button>
                                    {/* Agregar botón para modificar cliente */}
                                    <Button variant="info" onClick={() => handleModificarCliente(cliente)}>Modificar</Button>
                                    {/* Agregar botón para agregar turno */}
                                    <Button variant="primary" onClick={() => handleAgregarTurno(cliente)}>Agregar Turno</Button>
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

// Componente ModalConfirmarEliminarCliente para confirmar la eliminación de un cliente
const ModalConfirmarEliminarCliente = ({ show, handleClose, clienteSeleccionado, handleEliminarCliente }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Confirmar Eliminación</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>¿Está seguro que desea eliminar al cliente {clienteSeleccionado?.nombre} {clienteSeleccionado?.apellido}?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="danger" onClick={handleEliminarCliente}>Eliminar</Button>
            </Modal.Footer>
        </Modal>
    );
};


