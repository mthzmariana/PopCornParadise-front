import React, { useState } from "react";
import "./ContactoComponent.css";
import Claqueta from "../../assets/Claqueta.png";
import LogoNaranaja from "../../icons/logonaranja.jsx";

const ContactoComponent = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [mensaje, setMensaje] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/contacto", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, email, comentarios }),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el mensaje");
      }

      setNombre("");
      setEmail("");
      setComentarios("");
      setMensaje("Mensaje enviado correctamente");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      setMensaje("Error al enviar el mensaje");
    }
  };

  return (
    <div>
      <section className="contact-page">
        <div className="cont-img-form">
          <div className="elemento-form">
            <img className="claqueta" src={Claqueta} alt="Claqueta" />
          </div>

          <div className="elemento-form">
            <form className="cont-formulario" onSubmit={handleSubmit}>
              <div>
                <label className="label-form" htmlFor="nombre">
                  Nombre
                </label>
                <input
                  id="nombre"
                  className="input-form"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Escribe tu nombre"
                  required
                />
              </div>
              <div>
                <label className="label-form" htmlFor="email">
                  Correo
                </label>
                <input
                  id="email"
                  className="input-form"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div>
                <label className="label-form" htmlFor="comentarios">
                  Comentarios
                </label>
                <textarea
                  id="comentarios"
                  className="input-form"
                  value={comentarios}
                  onChange={(e) => setComentarios(e.target.value)}
                  placeholder="Escribe tus comentarios aquí"
                  rows="4"
                  required
                />
              </div>
              <button className="button-env" type="submit">
                Enviar
              </button>
              {mensaje && <p>{mensaje}</p>}
            </form>
          </div>
        </div>
      </section>
      <div className="logo-naranja">
        <LogoNaranaja />
      </div>
    </div>
  );
};

export default ContactoComponent;