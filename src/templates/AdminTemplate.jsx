import React from 'react';
import { Routes, Route } from 'react-router-dom';


import './AdminTemplate.css';
import AdminSidebar from '../admin/AdminSidebar';
import AdminNav from '../admin/AdminNav';
import ListadoUsuarioComponent from '../components/ListadoUsuarioComponent/ListadoUsuarioComponent';
import EditUsuarioComponent from '../components/EditUsuarioComponent/EditUsuarioComponent';


//import ProtectedRoute from '../ProtectedRoute';


const AdminTemplate = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminNav />
        <div className="p-10">
          <Routes>
          <Route path="usuarios/listado" element={<ListadoUsuarioComponent/>} />
          <Route path="usuarios/editar/:id" element={<EditUsuarioComponent/>} />
          
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
