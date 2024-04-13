
// // Agrega aquí las funciones para las operaciones CRUD adicionales, como editar, eliminar, obtener por ID, etc.
const URL = 'http://localhost:4000'; // Ajusta la URL según tu backend

export async function login(datos) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const respuesta = await fetch(`${URL}/login`, options);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error('Error en login:', error);
    throw error;
  }
}

export async function registro(datos) {
  try {
    const options = {
      method: 'POST',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const respuesta = await fetch(`${URL}/registro`, options);
    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error('Error en registro:', error);
    throw error;
  }
}
export async function getUsuarios() {
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const respuesta = await fetch(`${URL}/usuarios`, options);
    const data = await respuesta.json();
    console.log('Received data:', data); // Log the entire response data
    return data;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    throw error;
  }
}

  // Puedes agregar aquí las funciones para las operaciones CRUD adicionales, como editar, eliminar, obtener por ID, etc.

// Ejemplo de función para obtener un usuario por ID
export async function getUsuarioById(id) {
    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await fetch(`${URL}/usuarios/${id}`, options);
      const data = await respuesta.json();
      return data;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }
  