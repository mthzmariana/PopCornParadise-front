import React, { useState, useEffect } from 'react';
import './RegistroProductoComponent.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegistroProductoComponent() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [idgenero, setIdGenero] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [idclasificacion, setIdClasificacion] = useState("");
  const [p_movie, setPMovie] = useState("");
  const [fotoFile, setFotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/genero")
      .then((response) => response.json())
      .then((data) => {
        setGeneros(data);
        if (data.length > 0) {
          setIdGenero(data[0]._id);
        }
      })
      .catch((error) => console.error("Error al obtener géneros: ", error));

    fetch("http://localhost:4000/clasificacion")
      .then((response) => response.json())
      .then((data) => {
        setClasificaciones(data);
        if (data.length > 0) {
          setIdClasificacion(data[0]._id);
        }
      })
      .catch((error) => console.error("Error al obtener clasificaciones: ", error));
  }, []);

  const handleFileChange = (event) => {
    setFotoFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('nombre', nombre);
      formData.append('idgenero', idgenero);
      formData.append('descripcion', descripcion);
      formData.append('idclasificacion', idclasificacion);
      formData.append('p_movie', p_movie);
      formData.append('foto', fotoFile);

      const response = await axios.post('http://localhost:4000/movie', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("Respuesta: ", response.data);
      alert("Película agregada exitosamente");
      navigate("/admin/productos/listado");
    } catch (error) {
      console.error("Error al agregar la película", error.message);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="login-page-producto">
      <div className="formR-producto">
        <h2>Registrar Producto</h2>
        <div className="container">
          <div className="left-column">
            <div className="image-upload">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {previewImage && <img src={previewImage} alt="Vista Previa" />}
            </div>
          </div>
          <div className="right-column">
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="inputNombre">Nombre:</label>
                  <input
                    type="text"
                    id="inputNombre"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(event) => setNombre(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="inputGenero">Género:</label>
                  <select
                    id="inputGenero"
                    value={idgenero}
                    onChange={(event) => setIdGenero(event.target.value)}
                    required
                  >
                    {generos.map((genero) => (
                      <option key={genero._id} value={genero._id}>
                        {genero.nomgenero}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inputDescripcion">Descripción:</label>
                  <textarea
                    id="inputDescripcion"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(event) => setDescripcion(event.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="inputClasificacion">Clasificación:</label>
                  <select
                    id="inputClasificacion"
                    value={idclasificacion}
                    onChange={(event) => setIdClasificacion(event.target.value)}
                    required
                  >
                    {clasificaciones.map((clasificacion) => (
                      <option key={clasificacion._id} value={clasificacion._id}>
                        {clasificacion.nomclasificacion}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="inputPrecio">Precio:</label>
                  <input
                    type="text"
                    id="inputPrecio"
                    placeholder="Precio"
                    value={p_movie}
                    onChange={(event) => setPMovie(event.target.value)}
                    required
                  />
                </div>
                <div className="buttons-producto">
                  <button className="button-regis-producto guardar" type="submit">Guardar</button>
                  <button className="button-regis-producto cancelar" type="button" onClick={() => navigate("/admin/productos/listado")}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistroProductoComponent;
