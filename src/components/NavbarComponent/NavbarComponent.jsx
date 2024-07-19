import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./NavbarComponent.css";
import MiniLogo from "../../icons/minilogo.jsx";
import { UserContext } from '../../contexts/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

function NavbarComponent() {
  const { user, setUser } = useContext(UserContext);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Usuario en NavbarComponent:', user);
  }, [user]);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

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
          navigate('/login'); 
        }
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  const handleProfileClick = () => {
    if (user && user.idrol === '6655fffe03c0d12c9dff1f3f') {
      window.location.href = '/admin';
    } else if (user && user.idrol === '665600b703c0d12c9dff1f40') {
      window.location.href = '/perfil';
    } else {
      console.warn('No se encontró un ID de rol válido para redireccionar.');
    }
  };

  return (
    <div>
      <nav className="navbar">
        <button className="MiniLogo">
          <a href="/">
            <MiniLogo />
          </a>
        </button>
        <div className="nav-links">
          <a href="/">Inicio</a>
          <a href="/acerca-de">Acerca de</a>
          <a href="/contacto">Soporte</a>
          <a href="/peliculas">Películas y Series</a>
        </div>
        <div className="nav-links">
          {user ? (
            <div className="profile-dropdown">
              <span onClick={toggleDropdown} className="profile-name">{user.user}</span>
              {dropdownVisible && (
                <div className="dropdown-menu">
                  <a onClick={handleProfileClick}>Mi perfil</a>
                  <a onClick={handleLogout}>Cerrar sesión</a>
                </div>
              )}
            </div>
          ) : (
            <>
              <a href="/login">Iniciar sesión</a>
              <a href="/registro">Registrarse</a>
            </>
          )}
        </div>
        <button
          className="mobile-menu-icon"
          onClick={() => {
            document
              .querySelector(".nav-links-container")
              .classList.toggle("active");
          }}
        >
          ☰
        </button>
      </nav>
    </div>
  );
}

export default NavbarComponent;
