import React from 'react';
import "./RegistroComponent.css";
import LogoSinFondo from "../../assets/LogoSinFondo.png";

function RegistroComponent() {
  return (
    <div className="login-page">
      <div className="formR">
        
        <form>
        <div className="img-sm">
          <img src={LogoSinFondo} alt="LogoL"/>
        </div>
          <div>
            <input
              type="text"
              name="inputNombre"
              id="inputNombre"
              placeholder="Usuario"
            />
          </div>
          <div>
            <input
              type="text"
              name="inputCorreo"
              id="inputCorreo"
              placeholder="Correo"
            />
          </div>
          <div>
            <input
              type="number"
              name="inputEdad"
              id="inputEdad"
              placeholder="Edad"
            />
          </div>
          <div>
            <input
              type="password"
              name="inputPassworld"
              id="inputPassworld"
              placeholder="Contrasena"
            />
          </div>
          <button type="button">Crear</button>
          <p className="message">¿Ya estás registrado? <a href="/login">Inicia sesión</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegistroComponent;
