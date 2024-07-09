const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysqlConnect = require('../database/database');

// Middleware para verificar el token JWT
function verificarToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.sendStatus(403); // Forbidden si no hay token
  }
}

// Listar usuarios
// Método GET
// URL /listar_usuarios
router.get('/listar_usuarios', verificarToken, (req, res) => {
  jwt.verify(req.token, 'cortandoando', (error, valido) => {
    if (error) {
      res.sendStatus(403); // Forbidden si el token no es válido
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
      res.sendStatus(403); // Forbidden si el token no es válido
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
router.post('/crear_usuario', verificarToken, (req, res) => {
  jwt.verify(req.token, 'cortandoando', (error, valido) => {
    if (error) {
      res.sendStatus(403); // Forbidden si el token no es válido
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
router.put('/actualizar_usuario/:id_usuario', verificarToken, (req, res) => {
  jwt.verify(req.token, 'cortandoando', (error, valido) => {
    if (error) {
      res.sendStatus(403); // Forbidden si el token no es válido
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
      res.sendStatus(403); // Forbidden si el token no es válido
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

module.exports = router;
