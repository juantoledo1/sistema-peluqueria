import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import Sidebar from './Sidebar';

const Dashboard = () => {
    return (
        <Container fluid className="p-0">
            <Row className="min-vh-100">
                {/* Sidebar */}
                <Col xs={12} md={3} className="bg-dark text-light p-0">
                    <Sidebar />
                </Col>

                {/* Main Content */}
                <Col xs={12} md={9} className="bg-black text-light py-1">
                    {/* Navbar */}
                    <CustomNavbar className= '' />

                    {/* Content Area */}
                    <div className="flex-grow-1 px-3">
                        <Outlet />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
