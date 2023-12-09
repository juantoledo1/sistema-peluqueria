const express = require('express');
const router = express.Router(); // Utilizamos express.Router() para crear un enrutador

const mysqlconect = require('../database/database');

// // Ruta para obtener todos los empleados
// router.get('/empleados', (req, res) => {
//   // Realizamos una consulta a la base de datos para obtener todos los empleados
//   mysqlconect.query('SELECT * FROM empleados', (err, result) => {
//     if (err) {
//       console.error('Error al obtener empleados:', err);
//       res.status(500).send('Error al obtener empleados');
//     } else {
//       res.json(result);
//     }
//   });
// });

// // Ruta para obtener un empleado por ID
// router.get('/empleados/:id', (req, res) => {
//   const empleadoId = req.params.id;
//   mysqlconect.query('SELECT * FROM empleados WHERE id_empleado = ?', [empleadoId], (err, result) => {
//     if (err) {
//       console.error('Error al obtener el empleado:', err);
//       res.status(500).send('Error al obtener el empleado');
//     } else {
//       if (result.length > 0) {
//         res.json(result[0]);
//       } else {
//         res.status(404).send('Empleado no encontrado');
//       }
//     }
//   });
// });

// Otras rutas y operaciones CRUD pueden ser agregadas según tus necesidades

// Exportamos el enrutador para su uso en otros archivos
module.exports = router;
