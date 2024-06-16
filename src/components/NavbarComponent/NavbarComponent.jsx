import "./NavbarComponent.css";
import MiniLogo from "../../icons/minilogo.jsx";

function NavbarComponent() {
  return (
    <div>
      <nav className="navbar">
        <div className="nav-links-container">
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
          <div className="auth-links">
            <a href="/login">Iniciar sesión</a>
            <a href="/registro">Registrarse</a>
          </div>
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
