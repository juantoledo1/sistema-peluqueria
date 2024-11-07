const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysqlConnect = require('../database/database'); // Asegúrate de que esta ruta sea correcta
const routesUsuarios = require('./routesUsuarios'); // Ruta de usuarios

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

                // Verificar la contraseña con bcrypt
                const passwordMatch = bcrypt.compareSync(pass.trim(), usuario.pass.trim());

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

// Endpoint para cerrar sesión (Logout)
router.post('/logout', (req, res) => {
    // Aquí simplemente eliminamos el token, ya que no hay estado en el servidor para mantener la sesión
    res.json({ status: true, mensaje: "Cierre de sesión exitoso" });
});

// Otras rutas y configuraciones necesarias

module.exports = router;
