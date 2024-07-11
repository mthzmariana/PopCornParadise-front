import React, { useContext } from 'react';
import './AdminNav.css'; // Ajusta la ruta según la estructura de tu proyecto
import '/public/css/hover-min.css';
import { UserContext } from '../contexts/UserContext';
import PerfilFoto1 from '/src/assets/PerfilFoto1.png';

const AdminNav = () => {
    const { user } = useContext(UserContext);

    return (
        <nav className="admin-nav">
            <div className="flex space-x-4">
                <a href="/" className="text-white flex items-center space-x-2 hvr-underline-from-center">
                    <i className="fas fa-home w-4 h-4"></i>
                    <span>Inicio</span>
                </a>
              
            </div>
            <div className="user-info">
                <img src={PerfilFoto1} alt="Perfil" className="w-8 h-8 rounded-full" />
                {user && (
                    <span className="text-white">{user.user}</span>
                )}
            </div>
        </nav>
    );
};

export default AdminNav;
