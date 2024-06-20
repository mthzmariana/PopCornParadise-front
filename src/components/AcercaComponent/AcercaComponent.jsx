import "./AcercaComponent.css";
import LogoNaranaja from "../../icons/logonaranja.jsx";

function AcercaComponent() {

  return (
    <div>
        <section className="cont-acerca">
          <div className="titulo-acerca">
            <h1>Sobre Popcorn Paradise</h1>
          </div>

          <div className="cont-info">

            <div className="cuadro-info">
              <div>
                <h2>Nuestra historia</h2>
              </div>
              <div>
                <p>Hemos sido un referente en la industria cinematográfica, comenzando con la venta de películas en formato físico y evolucionando para ofrecer nuestros servicios digitalmente.</p>
              </div>
            </div>

            <div className="cuadro-info">
              <div>
                <h2>Qué hacemos</h2>
              </div>
              <div>
                <p>Ofrecemos un catálogo de películas para compra, accesible desde cualquier dispositivo con conexión a internet de forma segura y fácil de usar.</p>
              </div>
            </div>

            <div className="cuadro-info">
              <div>
                <h2>Nos importas</h2>
              </div>
              <div>
                <p>Nos esforzamos por proporcionar un servicio excepcional. Queremos que cada visita a Popcorn Paradise sea una experiencia positiva y memorable.</p>
              </div>
            </div>

          </div>
          <LogoNaranaja />
        </section>
    </div>
  );
}

export default AcercaComponent;