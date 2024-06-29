import React, { useContext, useEffect } from 'react';
import "./NavbarComponent.css";
import MiniLogo from "../../icons/minilogo.jsx";
import { UserContext } from '../../contexts/UserContext';

function NavbarComponent() {
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log('Usuario en NavbarComponent:', user);
  }, [user]);

  return (
    <div>
      <nav className="navbar">
        <button className="MiniLogo">
          <a href="/">
            <MiniLogo />
          </a>
        </button>
        <div className="nav-links">
          <a href="/peliculas">Películas</a>
          <a href="/acerca-de">Acerca de</a>
          <a href="/contacto">Contacto</a>
        </div>
        <div className="nav-links">
          {user ? (
            <span>{user.user}</span>
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
