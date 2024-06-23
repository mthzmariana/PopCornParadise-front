import React, { useState, useContext } from 'react';
import './LoginComponent.css';
import LogoSinFondo from "../../assets/LogoSinFondo.png";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

function LoginComponent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleLogin = (e) => {
    e.preventDefault();

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
        localStorage.setItem('remember_token', data.rememberToken);
        setUser(data.user); // Establece el usuario en el contexto
        navigate('/perfil'); // Navega a la ruta del perfil
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Inicio de sesión fallido. Por favor, verifica tus datos e intenta nuevamente.');
      });
  };

  return (
    <div className="login-page">
      <div className="formL">
        <form onSubmit={handleLogin}>
          <div className="img-sm">
            <img src={LogoSinFondo} alt="LogoL" />
          </div>
          <div>
            <input
              className="input-box"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              required
            />
          </div>
          <div>
            <input
              className="input-box"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit">Login</button>
          <br />
          <br />
          <p className="text-black">¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
