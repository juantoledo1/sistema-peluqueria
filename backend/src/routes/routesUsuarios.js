const express = require('express');
const mysqlConnect = require('../database/database');
const bodyParser = require('body-parser');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Listar usuarios
// Método GET
// URL /listar_usuarios
router.get('/listar_usuarios', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            mysqlConnect.query('SELECT * FROM usuarios', (error, registros) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json(registros);
                }
            });
        }
    });
});

// Obtener un usuario por ID
// Método GET
// URL /usuarios/:id_usuario
router.get('/usuarios/:id_usuario', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { id_usuario } = req.params;
            mysqlConnect.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id_usuario], (error, registros) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json(registros);
                }
            });
        }
    });
});

// Crear un nuevo usuario
// Método POST
// URL /crear_usuario
router.post('/crear_usuario', verificarToken, bodyParser.json(), (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { nombre, user, pass, rol_id } = req.body;
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = bcrypt.hashSync(pass, 10);

            mysqlConnect.query('INSERT INTO usuarios (nombre, user, pass, rol_id) VALUES (?, ?, ?, ?)',
                [nombre, user, hashedPassword, rol_id], (error, registros) => {
                    if (error) {
                        console.log('Error en la base de datos', error);
                        res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                    } else {
                        res.json({ status: true, mensaje: "El usuario se creó correctamente" });
                    }
                });
        }
    });
});


// Actualizar un usuario por ID
// Método PUT
// URL /actualizar_usuario/:id_usuario
router.put('/actualizar_usuario/:id_usuario', verificarToken, bodyParser.json(), (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { id_usuario } = req.params;
            const { nombre, user, pass } = req.body;
            // Hash de la contraseña antes de almacenarla en la base de datos
            const hashedPassword = bcrypt.hashSync(pass, 10);

            mysqlConnect.query('UPDATE usuarios SET nombre = ?, user = ?, pass = ? WHERE id_usuario = ?',
                [nombre, user, hashedPassword, id_usuario], (error, registros) => {
                    if (error) {
                        console.log('Error en la base de datos', error);
                        res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                    } else {
                        res.json({ status: true, mensaje: "El usuario se actualizó correctamente" });
                    }
                });
        }
    });
});

// Eliminar un usuario por ID
// Método DELETE
// URL /eliminar_usuario/:id_usuario
router.delete('/eliminar_usuario/:id_usuario', verificarToken, (req, res) => {
    jwt.verify(req.token, 'cortandoando', (error, valido) => {
        if (error) {
            res.sendStatus(403);
        } else {
            const { id_usuario } = req.params;
            mysqlConnect.query('DELETE FROM usuarios WHERE id_usuario = ?', [id_usuario], (error, registros) => {
                if (error) {
                    console.log('Error en la base de datos', error);
                    res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
                } else {
                    res.json({ status: true, mensaje: "El usuario se eliminó correctamente" });
                }
            });
        }
    });
});

function verificarToken(req, res, next) {
    const bearer = req.headers['authorization'];
    if (typeof bearer !== 'cortandoando') {
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

// // Endpoint para iniciar sesión (Login)
// router.post('/login', bodyParser.json(), (req, res) => {
//     const { user, pass } = req.body;

//     // Consulta para obtener el usuario por user
//     mysqlConnect.query('SELECT * FROM usuarios WHERE user = ?', [user], (error, resultados) => {
//         if (error) {
//             console.log('Error en la base de datos', error);
//             res.status(500).json({ status: false, mensaje: "Error en la base de datos" });
//         } else {
//             // Verificar si se encontró un usuario con el user proporcionado
//             if (resultados.length > 0) {
//                 const usuario = resultados[0];

//                 // Verificar la contraseña con bcrypt
//                 if (bcrypt.compareSync(pass, usuario.pass)) {
//                     // Generar token JWT
//                     const token = jwt.sign({ id: usuario.id_usuario, user: usuario.user }, 'cortandoando', { expiresIn: '1h' });

//                     // Enviar el token como respuesta
//                     res.json({ status: true, mensaje: "Inicio de sesión exitoso", token });
//                 } else {
//                     res.json({ status: false, mensaje: "Contraseña incorrecta" });
//                 }
//             } else {
//                 res.json({ status: false, mensaje: "Usuario no encontrado" });
//             }
//         }
//     });
// });

// function verificarToken(req, res, next) {
//     const bearer = req.headers['authorization'];
//     if (typeof bearer !== 'cortandoando') {
//         const token = bearer.split(" ")[1];
//         req.token = token;
//         next();
//     } else {
//         res.sendStatus(403);
//     }
// }

module.exports = router;
