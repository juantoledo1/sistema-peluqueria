import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/Home';
import Login from './component/Login';
import Registros from './component/Registros';
import Clientes from './component/Clientes';
import Empleados from './component/Empleados';
import Servicios from './component/Servicios';
import Turnos from './component/Turnos';
import Usuarios from './component/Usuarios';
import Roles from './component/Roles';
import Dashboard from './component/Dashboard';



function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/registros' element={<Registros/>}></Route>
      <Route path='/clientes' element={<Clientes/>}></Route>
      <Route path='/empleados' element={<Empleados/>}></Route>
      <Route path='/servicios' element={<Servicios/>}></Route>
      <Route path='/turnos' element={<Turnos/>}></Route>
      <Route path='/usuarios' element={<Usuarios/>}></Route>
      <Route path='/roles' element={<Roles/>}></Route>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
      
      </Routes>
    </Router>
  );
}

export default App;
