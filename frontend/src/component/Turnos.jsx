

import React, { useState, useEffect } from 'react';
import { Container, Button, Modal, Table, Alert } from 'react-bootstrap';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomNavbar from './CustomNavbar';

const localizer = momentLocalizer(moment);

const Turnos = () => {
  const [showListarTurnosModal, setShowListarTurnosModal] = useState(false);
  const [turnos, setTurnos] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [selectedTurno, setSelectedTurno] = useState(null);

  useEffect(() => {
    listarTurnos();
  }, []);

  const listarTurnos = async () => {
    try {
      const response = await axios.get('http://localhost:4000/listar_turnos');
      setTurnos(response.data);
    } catch (error) {
      console.error('Error al obtener la lista de turnos:', error);
      setError('Error al obtener la lista de turnos');
    }
  };

  const handleListarTurnosModal = () => {
    setSelectedTurno(null); // Limpiar el turno seleccionado al abrir el modal
    setShowListarTurnosModal(true);
  };

  const handleCloseListarTurnosModal = () => setShowListarTurnosModal(false);

  // Mapeo de los eventos con detalles del turno
  const events = turnos.map((turno) => ({
    id: turno.id_turno,
    title: `${turno.servicio} con ${turno.empleado}`,
    start: new Date(turno.fecha), // Convertir la fecha a objeto Date
    end: new Date(moment(turno.fecha).add(1, 'hour')), // Finaliza 1 hora después del inicio (ajustable según tu lógica)
    details: {
      id: turno.id_turno,
      cliente: `${turno.nombre_cliente} ${turno.apellido_cliente}`, // Combinar nombre y apellido del cliente
      empleado: `${turno.nombre_empleado} ${turno.apellido_empleado}`, // Combinar nombre y apellido del empleado
      servicio: turno.nombre_servicio, // Usar nombre del servicio
      fecha: moment(turno.fecha).format('YYYY-MM-DD'),
      hora: turno.hora,
      precio:turno.precio,
    },
  }));

  // Componente para mostrar los detalles del turno seleccionado
  const DetallesTurno = ({ turno }) => (
    <Table striped bordered hover responsive className="mt-3">
      <thead>
        <tr>
          <th>ID</th>
          <th>Cliente</th>
          <th>Empleado</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>precio</th>
        </tr>
      </thead>
      <tbody>
        <tr key={turno.id}>
          <td>{turno.details.id}</td>
          <td>{turno.details.cliente}</td>
          <td>{turno.details.empleado}</td>
          <td>{turno.details.servicio}</td>
          <td>{turno.details.fecha}</td>
          <td>{turno.details.hora}</td>
          <td>{turno.details.precio}</td>
        </tr>
      </tbody>
    </Table>
  );

  // Componente para mostrar los turnos en el modal
  const ModalListarTurnos = ({ show, handleClose, turnos, events }) => (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Listado de Turnos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{ height: '500px' }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            onSelectEvent={(event) => setSelectedTurno(event)} // Al seleccionar un evento, actualizar el turno seleccionado
          />
        </div>
        {selectedTurno && <DetallesTurno turno={selectedTurno} />}
        {!selectedTurno && (
          <Alert variant="info">
            Seleccione un turno del calendario para ver los detalles.
          </Alert>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cerrar</Button>
      </Modal.Footer>
    </Modal>
  );

  return (
    <>
      <CustomNavbar />
      <div className="bg-dark text-light vh-100 d-flex align-items-center justify-content-center">
        <Container>
          <h2>Turnos</h2>
          <div className="d-grid gap-2 mb-3">
            <Button variant="info" size="lg" onClick={handleListarTurnosModal}>Ver Turnos</Button>
          </div>
        </Container>
      </div>

      <ModalListarTurnos
        show={showListarTurnosModal}
        handleClose={handleCloseListarTurnosModal}
        turnos={turnos}
        events={events}
      />
      {mensaje && <Alert variant="success" onClose={() => setMensaje('')} dismissible>{mensaje}</Alert>}
      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
    </>
  );
};

export default Turnos;
