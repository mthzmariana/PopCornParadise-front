import "./NavbarComponent.css";
import MiniLogo from "../../icons/minilogo.jsx";

function NavbarComponent() {
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
          <a href="/login">Iniciar sesión</a>
          <a href="/registro">Registrarse</a>
        </div>
      </nav>
    </div>
  );
}

export default NavbarComponent;
