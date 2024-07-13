import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './AdminTemplate.css';
import AdminSidebar from '../admin/AdminSidebar';
import AdminNav from '../admin/AdminNav';
import ListadoUsuarioComponent from '../components/ListadoUsuarioComponent/ListadoUsuarioComponent';
import EditUsuarioComponent from '../components/EditUsuarioComponent/EditUsuarioComponent';
import PermisoComponent from '../components/PermisoComponent/PermisoComponent';
import RolComponent from '../components/RolComponent/RolComponent';
import RolXPermisoComponent from '../components/RolXPermisoComponent/RolXPermisoComponent'
import RegistroUserComponent from '../components/RegistroUserComponent/RegistroUserComponent';
import ListadoProductosComponent from '../components/ListadoProductosComponent/ListadoProductosComponent';
import RegistroProductoComponent from '../components/RegistroProductoComponent/RegistroProductoComponent';
import EditarProductoComponent from '../components/EditarProductoComponent/EditarProductoComponent';

const AdminTemplate = () => {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 ml-64">
        <AdminNav />
        <div className="admin-container">
          <Routes>
          <Route path="usuarios/listado" element={<ListadoUsuarioComponent/>} />
          <Route path="usuarios/editar/:id" element={<EditUsuarioComponent/>} />
          <Route path="permisos/listado" element={<PermisoComponent/>} />
          <Route path="roles/listado" element={<RolComponent/>} />
          <Route path="rolxpermiso/listado" element={<RolXPermisoComponent/>} />
          <Route path="usuarios/agregar" element={<RegistroUserComponent/>} />
          <Route path="productos/listado" element={<ListadoProductosComponent/>} />
          <Route path="movies/agregar" element={<RegistroProductoComponent/>} />
          <Route path="movies/editar/:id" element={<EditarProductoComponent/>} />
        
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminTemplate;
