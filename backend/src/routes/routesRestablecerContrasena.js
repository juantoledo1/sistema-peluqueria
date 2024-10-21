const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const mysqlConnection = require('../database/database'); // Ajusta la ruta según tu configuración

// Configura el transporte de correo
const transporter = nodemailer.createTransport({
    service: 'Gmail', // Puedes usar otro servicio de correo
    auth: {
        user: 'tu-email@gmail.com', // Tu dirección de correo
        pass: 'tu-contraseña' // Tu contraseña de correo
    }
});

// Ruta para recuperar la contraseña
router.post('/', (req, res) => {
    const { email } = req.body;

    mysqlConnection.query('SELECT * FROM usuarios WHERE email = ?', [email], async (error, results) => {
        if (error) {
            console.error('Error al verificar el correo:', error);
            return res.status(500).json({ status: false, mensaje: 'Ocurrió un error al verificar el correo.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ status: false, mensaje: 'El correo electrónico no está registrado.' });
        }

        // Aquí deberías generar un token y guardarlo en la base de datos
        const token = 'token-de-ejemplo'; // Debes generar un token real y almacenarlo

        const mailOptions = {
            from: 'tu-email@gmail.com',
            to: email,
            subject: 'Recuperación de Contraseña',
            text: `Para restablecer tu contraseña, haz clic en el siguiente enlace: http://localhost:5173/restablecer-contrasena?token=${token}`
        };

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.error('Error al enviar el correo:', err);
                return res.status(500).json({ status: false, mensaje: 'Ocurrió un error al enviar el correo.' });
            }

            res.json({ status: true, mensaje: 'Correo de recuperación enviado.' });
        });
    });
});

module.exports = router;
