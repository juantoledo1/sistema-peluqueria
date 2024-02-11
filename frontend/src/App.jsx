import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './component/Home';
import Sidebar from './component/Sidebar';// Corrige la ruta de importación
import Login from './component/Login';
function App() {
  return (
    <Router>
      <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/sidebar' element={<Sidebar/>}></Route>
      
      </Routes>
    </Router>
  );
}

export default App;
