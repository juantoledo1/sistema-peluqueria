// servicios.jsx




// Login
const URL ='http://localhost:4000';

export async function login(datos) {
    try {
        const Options = {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json',
            }
        };
        const respuesta = await fetch(`${URL}/login`, Options);
        const data = await respuesta.json();
        return data;
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
}
