import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import '../admin/AdminSidebar.css';

import LogoSinFondo from '/src/assets/LogoSinFondo.png';

import { IoPeopleOutline, IoBagHandleOutline, IoCartOutline, IoLockClosedOutline, IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import axios from 'axios';

const AdminSidebar = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate(); // Hook de react-router-dom para redirigir

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/logout', {
        remember_token: user.remember_token 
      });
      if (response.status === 200) {
        const confirmLogout = window.confirm('¿Seguro quieres cerrar la sesión?');
        if (confirmLogout) {
          setUser(null); 
          alert('Sesión cerrada exitosamente');
          navigate('/login'); // Redirigir a la página de login
        }
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  return (
    <div className="admin-sidebar">
      <div className="logo-section">
        <img src={LogoSinFondo} alt="Logo" className="logo-img" />
      </div>
      <ul className="mt-6">
        <li className="li-sidebar">
          <NavLink to="/admin/usuarios/listado" className="flex items-center w-full" activeClassName="active">
            <IoPeopleOutline className="icon" />
            <span className="ml-4">Usuarios</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/productos/listado" className="flex items-center w-full" activeClassName="active">
            <IoBagHandleOutline className="icon" />
            <span className="ml-4">Productos</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/compras/listado" className="flex items-center w-full" activeClassName="active">
            <IoCartOutline className="icon" />
            <span className="ml-4">Compras</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/permisos/listado" className="flex items-center w-full" activeClassName="active">
            <IoLockClosedOutline className="icon" />
            <span className="ml-4">Permisos</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/roles/listado" className="flex items-center w-full" activeClassName="active">
            <IoLockClosedOutline className="icon" />
            <span className="ml-4">Roles</span>
          </NavLink>
        </li>
        <li className="li-sidebar">
          <NavLink to="/admin/rolxpermiso/listado" className="flex items-center w-full" activeClassName="active">
            <IoLockClosedOutline className="icon" />
            <span className="ml-4">Roles y permisos</span>
          </NavLink>
        </li>
  
        <li className="li-sidebar cerrar-sesion">
          <button className="flex items-center w-full" onClick={handleLogout}>
            <IoLogOutOutline className="icon" />
            <span className="ml-4">Cerrar Sesión</span>
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
