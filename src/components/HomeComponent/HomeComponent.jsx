import React, { useState } from "react";
import "./HomeComponent.css";
import ImgHome1 from "../../assets/ImgHome1.png";
import ImgHome2 from "../../assets/ImgHome2.png";
import ImgHome3 from "../../assets/ImgHome3.png";
import CarritoIcon from "../../icons/carritoicon.jsx";
import TarjetaIcon from "../../icons/tarjetaicon.jsx";
import ComprarIcon from "../../icons/compraricon.jsx";
import LogoSinRelleno from "../../icons/logosinrelleno.jsx";

const pestanas = [
  {
    id: "pestana-1",
    icon: <CarritoIcon />,
    label: "Elige",
    img: ImgHome1,
    text: "Elige esa película que tanto quieres ver. O elige más de una.",
  },
  {
    id: "pestana-2",
    icon: <TarjetaIcon />,
    label: "Paga",
    img: ImgHome2,
    text: "Paga el total desde la comodidad de tu casa.",
  },
  {
    id: "pestana-3",
    icon: <ComprarIcon />,
    label: "Disfruta",
    img: ImgHome3,
    text: "Disfruta de tu compra. Míralo solo o en compañía, cuantas veces quieras.",
  },
];

function ComponenteInicio() {
  const [pestanaActiva, setPestanaActiva] = useState("pestana-1");

  return (
    <div>
      <section>
        <div className="contenedor-padre">
          <div className="contenedor-izquierdo">
            <h1>Popcorn Paradise</h1>
            <h2>Prueba el verdadero paraíso del entretenimiento en línea</h2>
          </div>
          <div className="cuadrado-naranja">
            <LogoSinRelleno />
          </div>
        </div>
      </section>

      <section className="pestanas">
        <div className="contenedor-pes">
          {pestanas.map((pestana) => (
            <div
              key={pestana.id}
              id={pestana.id}
              className={`pestana-item ${
                pestanaActiva === pestana.id ? "pestana-borde" : ""
              }`}
              onClick={() => setPestanaActiva(pestana.id)}
            >
              <i>{pestana.icon}</i>
              <p>{pestana.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="contenido-pestana">
        <div className="contenedor-pes">
          {pestanas.map((pestana) => (
            <div
              key={`${pestana.id}-contenido`}
              id={`${pestana.id}-contenido`}
              className={`contenido-pestana-item ${
                pestanaActiva === pestana.id ? "mostrar" : ""
              }`}
            >
              <div className={`${pestana.id}-contenido-interno`}>
                <div>
                  <p className="texto-pes">{pestana.text}</p>
                </div>
                <img className="imagenInicio" src={pestana.img} alt="" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default ComponenteInicio;