const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser'); // Agregamos body-parser

// Configuramos el puerto a :
app.set('puerto', 4000);

// Middleware para registrar solicitudes en la consola (morgan)
app.use(morgan('dev'));

// Middleware para habilitar CORS
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(bodyParser.json());

// Rutas para cada entidad (empleados, servicios, clientes, etc.)
app.use(require('./routes/routesEmpleados.js'));
app.use(require('./routes/routesServicios.js'));
app.use(require('./routes/routesClientes.js'));
app.use(require('./routes/routesTurnos.js'));
app.use(require('./routes/routesUsuarios.js'));
app.use(require('./routes/routesLogin.js'));
app.use(require('./routes/routesRestablecerContrasena.js'));
// Iniciar el servidor
app.listen(app.get('puerto'), () => {
    console.log('El servidor de la peluquería está corriendo en el puerto', app.get('puerto'));
});
