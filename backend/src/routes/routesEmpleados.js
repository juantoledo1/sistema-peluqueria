const express = require('express');
const router = express.Router();
const mysqlConnect = require('../database/database');

const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Listar todos los empleados
router.get('/listar_empleados', (req, res) => {
    mysqlConnect.query('SELECT * FROM empleados', (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json(registros);
        }
    });
});

// Listar un empleado por ID
router.get('/listar_empleado/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('SELECT * FROM empleados WHERE id_empleado = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            if (registros.length > 0) {
                res.json(registros);
            } else {
                res.json({ status: false, mensaje: "El ID del empleado no existe" });
            }
        }
    });
});

// Crear un nuevo empleado
router.post('/crear_empleado', (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    mysqlConnect.query('INSERT INTO empleados (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)', [nombre, apellido, correo, telefono], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El empleado se creó correctamente" });
        }
    });
});

// Actualizar un empleado por ID
router.put('/actualizar_empleado/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono } = req.body;
    mysqlConnect.query('UPDATE empleados SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_empleado = ?', [nombre, apellido, correo, telefono, id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El empleado se actualizó correctamente" });
        }
    });
});

// Eliminar un empleado por ID
router.delete('/eliminar_empleado/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM empleados WHERE id_empleado = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El empleado se eliminó correctamente" });
        }
    });
});

module.exports = router;
