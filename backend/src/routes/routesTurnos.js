const express = require('express');
const router = express.Router();
const mysqlConnect = require('../database/database');

// Listar todos los turnos con detalles
router.get('/listar_turnos', (req, res) => {
    mysqlConnect.query('SELECT turnos.id_turno, turnos.fecha, turnos.hora, clientes.nombre AS nombre_cliente, clientes.apellido AS apellido_cliente, servicios.nombre AS nombre_servicio, servicios.precio, empleados.nombre AS nombre_empleado FROM turnos INNER JOIN clientes ON turnos.id_cliente = clientes.id_cliente INNER JOIN servicios ON turnos.id_servicio = servicios.id_servicio INNER JOIN empleados ON turnos.id_empleado = empleados.id_empleado', (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json(registros);
        }
    });
});

// Listar un turno por ID con detalles
router.get('/listar_turno/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('SELECT turnos.id_turno, turnos.fecha, turnos.hora, clientes.nombre AS nombre_cliente, clientes.apellido AS apellido_cliente, servicios.nombre AS nombre_servicio, empleados.nombre AS nombre_empleado FROM turnos INNER JOIN clientes ON turnos.id_cliente = clientes.id_cliente INNER JOIN servicios ON turnos.id_servicio = servicios.id_servicio INNER JOIN empleados ON turnos.id_empleado = empleados.id_empleado WHERE turnos.id_turno = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            if (registros.length > 0) {
                res.json(registros);
            } else {
                res.json({ status: false, mensaje: "El ID del turno no existe" });
            }
        }
    });
});

// Listar los turnos de un cliente por su ID
router.get('/listar_turnos_cliente/:id_cliente', (req, res) => {
    const { id_cliente } = req.params;
    mysqlConnect.query('SELECT turnos.id_turno, turnos.fecha, turnos.hora, empleados.nombre AS empleado_nombre, servicios.nombre AS servicio_nombre, servicios.precio ' +
                      'FROM turnos ' +
                      'INNER JOIN empleados ON turnos.id_empleado = empleados.id_empleado ' +
                      'INNER JOIN servicios ON turnos.id_servicio = servicios.id_servicio ' +
                      'WHERE turnos.id_cliente = ?', [id_cliente], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json(registros);
        }
    });
});



// Crear un nuevo turno
router.post('/crear_turno', (req, res) => {
    const { fecha, hora, id_cliente, id_empleado, id_servicio } = req.body;
    mysqlConnect.query('INSERT INTO turnos (fecha, hora, id_cliente, id_empleado, id_servicio) VALUES (?, ?, ?, ?, ?)', [fecha, hora, id_cliente, id_empleado, id_servicio], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El turno se creó correctamente" });
        }
    });
});

// Actualizar un turno por ID
router.put('/actualizar_turno/:id', (req, res) => {
    const { id } = req.params;
    const { fecha, hora, id_cliente, id_empleado, id_servicio } = req.body;
    mysqlConnect.query('UPDATE turnos SET fecha = ?, hora = ?, id_cliente = ?, id_empleado = ?, id_servicio = ? WHERE id_turno = ?', [fecha, hora, id_cliente, id_empleado, id_servicio, id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El turno se actualizó correctamente" });
        }
    });
});

// Eliminar un turno por ID
router.delete('/eliminar_turno/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM turnos WHERE id_turno = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El turno se eliminó correctamente" });
        }
    });
});

module.exports = router;
