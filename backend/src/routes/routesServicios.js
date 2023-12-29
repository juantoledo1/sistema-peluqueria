const express = require('express');
const router = express.Router();
const mysqlConnect = require('../database/database');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

router.use(express.json());

// Listar todos los servicios
router.get('/listar_servicios', (req, res) => {
    mysqlConnect.query('SELECT * FROM servicios', (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json(registros);
        }
    });
});

// Listar un servicio por ID
router.get('/listar_servicio/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('SELECT * FROM servicios WHERE id_servicio = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            if (registros.length > 0) {
                res.json(registros);
            } else {
                res.json({ status: false, mensaje: "El ID del servicio no existe" });
            }
        }
    });
});

// Crear un nuevo servicio
router.post('/crear_servicio', (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    mysqlConnect.query('INSERT INTO servicios (nombre, descripcion, precio) VALUES (?, ?, ?)', [nombre, descripcion, precio], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El servicio se creó correctamente" });
        }
    });
});

// Actualizar un servicio por ID
router.put('/actualizar_servicio/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio } = req.body;
    mysqlConnect.query('UPDATE servicios SET nombre = ?, descripcion = ?, precio = ? WHERE id_servicio = ?', [nombre, descripcion, precio, id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El servicio se actualizó correctamente" });
        }
    });
});

// Eliminar un servicio por ID
router.delete('/eliminar_servicio/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnect.query('DELETE FROM servicios WHERE id_servicio = ?', [id], (error, registros) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            res.json({ status: true, mensaje: "El servicio se eliminó correctamente" });
        }
    });
});

module.exports = router;
