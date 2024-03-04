
import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import { getUsuarios } from '../servicios/servicios'; // Importar la función getUsuarios desde servicios

const Dashboard = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getUserName();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const getUserName = async () => {
        try {
            const response = await getUsuarios(); // Llamar a la función getUsuarios para obtener el nombre de usuario
            setUserName(response.user);
        } catch (error) {
            console.error('Error al obtener el nombre de usuario:', error);
        }
    };

    return (
        <>
        <Container fluid className="dashboard-container vh-100 bg-black">
            <CustomNavbar userName={userName} handleLogout={handleLogout} />
            <Container>
                <h2>Dashboard</h2>
                <p>Bienvenido al Dashboard. Aquí puedes gestionar todos los aspectos de tu negocio.</p>
                <div className="mt-3">
                    <Button as={Link} to="/clientes" variant="primary" className="w-100 mb-3">Clientes</Button>
                    <Button as={Link} to="/empleados" variant="primary" className="w-100 mb-3">Empleados</Button>
                    <Button as={Link} to="/turnos" variant="primary" className="w-100 mb-3">Turnos</Button>
                    <Button as={Link} to="/servicios" variant="primary" className="w-100 mb-3">Servicios</Button>
                    <Button as={Link} to="/usuarios" variant="primary" className="w-100 mb-3">Usuarios</Button>
                    <Button as={Link} to="/roles" variant="primary" className="w-100">Roles</Button>
                </div>
            </Container>
        </Container>
        </>
    );
};

export default Dashboard;
