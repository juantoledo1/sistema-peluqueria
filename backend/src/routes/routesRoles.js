const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnect = require('../database/database');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403); // Forbidden si no hay token
    }
}

// Crear un nuevo rol
router.post('/crear_rol', verificarToken, bodyParser.json(), (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403); // Forbidden si hay error en el token
        } else {
            const { nombre } = req.body;

            mysqlConnect.query('INSERT INTO roles (nombre) VALUES (?)', [nombre], (error, resultado) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json({ status: true, mensaje: "El rol se creó correctamente", nuevo_id: resultado.insertId });
                }
            });
        }
    });
});

// Obtener todos los roles
router.get('/listar_roles', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403); // Forbidden si hay error en el token
        } else {
            mysqlConnect.query('SELECT * FROM roles', (error, roles) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json(roles);
                }
            });
        }
    });
});

// Obtener un rol por ID
router.get('/roles/:id_rol', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403); // Forbidden si hay error en el token
        } else {
            const { id_rol } = req.params;
            mysqlConnect.query('SELECT * FROM roles WHERE rol_id = ?', [id_rol], (error, resultado) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json(resultado);
                }
            });
        }
    });
});

// Actualizar un rol por ID
router.put('/actualizar_rol/:id_rol', verificarToken, bodyParser.json(), (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403); // Forbidden si hay error en el token
        } else {
            const { id_rol } = req.params;
            const { nombre } = req.body;

            mysqlConnect.query('UPDATE roles SET nombre = ? WHERE rol_id = ?', [nombre, id_rol], (error, resultado) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json({ status: true, mensaje: "El rol se actualizó correctamente" });
                }
            });
        }
    });
});

// Eliminar un rol por ID
router.delete('/eliminar_rol/:id_rol', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403); // Forbidden si hay error en el token
        } else {
            const { id_rol } = req.params;
            mysqlConnect.query('DELETE FROM roles WHERE rol_id = ?', [id_rol], (error, resultado) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json({ status: true, mensaje: "El rol se eliminó correctamente" });
                }
            });
        }
    });
});

module.exports = router;
