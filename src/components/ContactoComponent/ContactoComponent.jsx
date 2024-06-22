import React, { useState } from 'react';
import './ContactoComponent.css';
import ClaquetaLogo from '../../assets/Claqueta.png';

const ContactoComponent = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [comentarios, setComentarios] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Manejar el envío del formulario aquí
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Comentarios:', comentarios);
  };

  return (
    <div className="contact-page">
      <div className="logo-container">
        <img src={ClaquetaLogo} alt="Claqueta Logo" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              id="nombre"
              className="input-box"
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Escribe tu nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Correo</label>
            <input
              id="email"
              className="input-box"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="correo@ejemplo.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="comentarios">Comentarios</label>
            <textarea
              id="comentarios"
              className="input-box"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
              placeholder="Escribe tus comentarios aquí"
              rows="4"
              required
            />
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default ContactoComponent;
