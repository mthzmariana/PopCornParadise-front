<<<<<<< Updated upstream
import "./LoginComponent.css";
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginComponent({handleNavbar, handleFooter}) {
  const navigate = useNavigate();

  useEffect(() => {
    handleNavbar(false);
    handleFooter(false);
    
    return () => {
      handleNavbar(true);
      handleFooter(true);
    };
  }, [handleNavbar, handleFooter]);

  return (
    <div>
        <h1>Iniciar sesión</h1>
=======
import React, { useState } from 'react';
import './LoginComponent.css';
import LogoSinFondo from "../../assets/LogoSinFondo.png";
import { useNavigate } from 'react-router-dom';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const userData = { email, password };
    const settings = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };

    fetch('http://localhost:4000/login', settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Inicio de sesión fallido');
      })
      .then(data => {
        console.log('Respuesta del servidor:', data);
        alert('Inicio de sesión exitoso');
        navigate('/peliculas');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Inicio de sesión fallido. Por favor, verifica tus datos e intenta nuevamente.');
      });
  };

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
            />
          </div>
          <div>
            <input
              className="input-box"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
            />
          </div>
          <button type="button" onClick={handleLogin}>Login</button>
          <br />
          <br />
          <p className="text-black">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </form>
      </div>
>>>>>>> Stashed changes
    </div>
  );
}

export default LoginComponent;
