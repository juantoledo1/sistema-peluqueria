const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Sinley123.',
  database: 'peluqueria',
});

// Conectar a la base de datos
mysqlConnection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.message);
  } else {
    console.log('Conexión exitosa a la base de datos');
  }
});

// Exportar la conexión para su uso en otros módulos
module.exports = mysqlConnection;
