import React from 'react';
import './LoginComponent.css';
import LogoSinFondo from "../../assets/LogoSinFondo.png";

function LoginComponent() {
  return (
    <div className="login-page">
      
      <div className="formL">
        
        <form>
        <div className="img-sm">
          <img src={LogoSinFondo} alt="LogoL"/>
        </div>
          <div>
            <input
              className="input-box"
              type="email"
              placeholder="Correo"
            />
          </div>
          <div>
            <input
              className="input-box"
              type="password"
              placeholder="Contrasena"
            />
          </div>
          <button type="button">Login</button>
          <br />
          <br />
          <p className="text-black">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
