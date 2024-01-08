const express = require('express');
const router = express.Router();
const mysqlConnect = require('../database/database');

// Listar todos los clientes
router.get('/listar_clientes', (req, res) => {
    mysqlConnect.query('SELECT * FROM clientes', (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json(registros);
        }
    });
});

// Listar un cliente por ID
router.get('/listar_cliente/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('SELECT * FROM clientes WHERE id_cliente = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            if (registros.length > 0) {
                res.json(registros);
            } else {
                res.json({ status: false, mensaje: "El ID del cliente no existe" });
            }
        }
    });
});

// Crear un nuevo cliente
router.post('/crear_cliente', (req, res) => {
    const { nombre, apellido, correo, telefono } = req.body;
    mysqlConnect.query('INSERT INTO clientes (nombre, apellido, correo, telefono) VALUES (?, ?, ?, ?)', [nombre, apellido, correo, telefono], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El cliente se creó correctamente" });
        }
    });
});

// Actualizar un cliente por ID
router.put('/actualizar_cliente/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, correo, telefono } = req.body;
    mysqlConnect.query('UPDATE clientes SET nombre = ?, apellido = ?, correo = ?, telefono = ? WHERE id_cliente = ?', [nombre, apellido, correo, telefono, id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El cliente se actualizó correctamente" });
        }
    });
});

// Eliminar un cliente por ID
router.delete('/eliminar_cliente/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM clientes WHERE id_cliente = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El cliente se eliminó correctamente" });
        }
    });
});

module.exports = router;
