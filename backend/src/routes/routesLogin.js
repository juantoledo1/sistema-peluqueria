const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const routesUsuarios = require('./routesUsuarios'); // Asegúrate de tener la ruta correcta al archivo routesUsuarios.js
const mysqlConnect = require('../database/database');

const router = express.Router();

// Middleware para verificar token
function verificarToken(req, res, next) {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== 'undefined') {
        const token = bearer.split(" ")[1];
        jwt.verify(token, 'cortandoando', (error, valido) => {
            if (error) {
                res.sendStatus(403);
            } else {
                req.token = token;
                next();
            }
        });
    } else {
        res.sendStatus(403);
    }
}

// Rutas públicas (sin necesidad de token)
router.use('/usuarios', routesUsuarios);

// Endpoint para iniciar sesión (Login)
router.post('/login', bodyParser.json(), (req, res) => {
    const { user, pass } = req.body;

    // Consulta para obtener el usuario por user
    mysqlConnect.query('SELECT * FROM usuarios WHERE user = ?', [user], (error, resultados) => {
        if (error) {
            console.log('Error en la base de datos', error);
            res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
        } else {
            // Verificar si se encontró un usuario con el user proporcionado
            if (resultados.length > 0) {
                const usuario = resultados[0];

                // Logs de depuración
                console.log('Contraseña almacenada:', usuario.pass);
                console.log('Contraseña proporcionada:', pass);

                // Verificar la contraseña con bcrypt
                const passwordMatch = bcrypt.compareSync(pass.trim(), usuario.pass.trim());

                // Log de depuración
                console.log('bcrypt.compareSync result:', passwordMatch);

                if (passwordMatch) {
                    // Generar token JWT
                    const token = jwt.sign({ id: usuario.id_usuario, user: usuario.user }, 'cortandoando', { expiresIn: '1h' });

                    // Enviar el token como respuesta
                    res.json({ status: true, mensaje: "Inicio de sesión exitoso", token });
                } else {
                    res.json({ status: false, mensaje: "Contraseña incorrecta" });
                }
            } else {
                res.json({ status: false, mensaje: "Usuario no encontrado" });
            }
        }
    });
});

// Otras rutas y configuraciones necesarias

module.exports = router;
