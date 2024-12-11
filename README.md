# Sistema de Gestión para Salón de Belleza

Este repositorio contiene un sistema completo de gestión desarrollado para un salón de belleza. El sistema permite administrar clientes, empleados, servicios, turnos, usuarios y roles. Además, incluye funcionalidades de cálculo de ingresos y visualización de datos a través de gráficas.

## Tecnologías Utilizadas

### Frontend
- **Framework**: React
- **Estilo**: React-Bootstrap, Bootstrap 5
- **Bibliotecas Adicionales**:
  - Axios (para realizar peticiones HTTP)
  - React Big Calendar (para la gestión de turnos)
  - React Chart.js 2 (para visualización de gráficas)

### Backend
- **Lenguaje**: Node.js
- **Framework**: Express.js
- **Base de Datos**: MySQL
- **Autenticación**: JWT (JSON Web Token)
- **Cifrado de Contraseñas**: bcrypt

## Características Principales

### Módulos Implementados

#### 1. Clientes
- Crear, listar, modificar y eliminar clientes.
- Visualización detallada de información de cada cliente.

#### 2. Empleados
- Funcionalidades similares al módulo de clientes.
- Gestión completa de datos de empleados.

#### 3. Servicios
- CRUD de servicios disponibles en el salón.
- Cada servicio incluye información como descripción y precio.

#### 4. Turnos
- Gestión de turnos utilizando React Big Calendar.
- Asociación de turnos con clientes, empleados y servicios.

#### 5. Usuarios y Roles
- Gestión de usuarios con roles diferenciados:
  - `admin1`: Acceso completo (CRUD).
  - `admin2`: Acceso de solo lectura.
- Los roles sólo pueden ser modificados por `admin1`.

#### 6. Ganancias
- Cálculo de ingresos diarios, semanales, mensuales y anuales.
- Visualización de gráficas para los ingresos.

### Navegación
- Barra lateral persistente para navegación entre módulos.
- Diseño responsivo utilizando Bootstrap 5.

## Estructura del Proyecto

### Frontend
```
/src
  /components
    - Dashboard.js
    - Clientes.js
    - Empleados.js
    - Servicios.js
    - Turnos.js
    - Ganancias.js
    - Roles.js
    - Navbar.js
  /utils
    - api.js (configuración de Axios)
```

### Backend
```
/src
  /routes
    - routesClientes.js
    - routesEmpleados.js
    - routesServicios.js
    - routesTurnos.js
    - routesUsuarios.js
  /controllers
    - clientesController.js
    - empleadosController.js
    - serviciosController.js
    - turnosController.js
    - usuariosController.js
  /models
    - db.js (conexión a MySQL)
```

## Instalación

### Requisitos Previos
- Node.js v16 o superior
- MySQL
- React v18 o superior

### Pasos

1. Clonar el repositorio:
```bash
git clone https://github.com/tuusuario/sistema-gestion-salon.git
```

2. Configurar el backend:
   - Navega al directorio del backend:
   ```bash
   cd backend
   ```
   - Instala las dependencias:
   ```bash
   npm install
   ```
   - Configura el archivo `.env` con las credenciales de tu base de datos MySQL:
     ```env
     DB_HOST=localhost
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_NAME=nombre_base_datos
     JWT_SECRET=clave_secreta
     ```
   - Inicia el servidor:
   ```bash
   npm start
   ```

3. Configurar el frontend:
   - Navega al directorio del frontend:
   ```bash
   cd frontend
   ```
   - Instala las dependencias:
   ```bash
   npm install
   ```
   - Inicia la aplicación:
   ```bash
   npm start
   ```

4. Configurar la base de datos:
   - Importa el archivo `schema.sql` en tu servidor MySQL para crear las tablas necesarias.

## Uso

1. Accede a la aplicación desde tu navegador en `http://localhost:3000`.
2. Inicia sesión con un usuario y rol adecuado.
3. Navega entre los módulos para gestionar clientes, empleados, servicios, turnos y más.

## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más información.

