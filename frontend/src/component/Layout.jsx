import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Sidebar from './Sidebar';
import CustomNavbar from './CustomNavbar';

const Layout = () => {
    return (
        <Container fluid className="p-0 d-flex">
            <Sidebar />
            <Container fluid className="p-0 d-flex flex-column">
                <CustomNavbar />
                <Container fluid className="p-4">
                    <Outlet />
                </Container>
            </Container>
        </Container>
    );
};

export default Layout;
