import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './EditarProductoComponent.css'; // Archivo CSS personalizado para estilos

const EditarProductoComponent = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState({
    nombre: '',
    idgenero: '',
    descripcion: '',
    idclasificacion: '',
    p_movie: '',
  });
  const [fotoFile, setFotoFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [generos, setGeneros] = useState([]);
  const [clasificaciones, setClasificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const generosResponse = await axios.get('http://localhost:4000/genero');
        const clasificacionesResponse = await axios.get('http://localhost:4000/clasificacion');
        
        setGeneros(generosResponse.data);
        setClasificaciones(clasificacionesResponse.data);

        if (id) {
          const movieResponse = await axios.get(`http://localhost:4000/movie/${id}`);
          const movie = movieResponse.data;

          setProducto({
            nombre: movie.nombre,
            idgenero: movie.idgenero,
            descripcion: movie.descripcion,
            idclasificacion: movie.idclasificacion,
            p_movie: movie.p_movie.toString(),
          });
          setPreviewImage(movie.foto);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error al obtener los datos de la película:', error);
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProducto(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = e => {
    setFotoFile(e.target.files[0]);
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', fotoFile);
    try {
      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.filepath;
    } catch (error) {
      console.error('Error al subir la imagen', error);
      alert('Error al subir la imagen');
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let imagePath = previewImage;
    if (fotoFile) {
      imagePath = await uploadImage();
    }

    const updatedProduct = {
      ...producto,
      foto: imagePath,
    };

    try {
      const response = await axios.put(`http://localhost:4000/movie/${id}`, updatedProduct);

      if (response.status !== 200) {
        throw new Error('Error en la solicitud.');
      }

      alert('Película actualizada exitosamente');
      navigate('/admin/productos/listado');
    } catch (error) {
      console.error('Error al actualizar la película:', error.message);
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="login-page-editproducto">
      <div className="formR-editproducto">
        <h2>Editar Producto</h2>
        <div className="container-editproducto">
          <div className="left-column-editproducto">
            <div className="image-upload-editproducto">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {previewImage && <img src={previewImage} alt="Vista Previa" />}
            </div>
          </div>
          <div className="right-column-editproducto">
            <div className="form-container-editproducto">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="inputNombre">Nombre:</label>
                  <input
                    type="text"
                    id="inputNombre"
                    name="nombre"
                    placeholder="Nombre"
                    value={producto.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="inputGenero">Género:</label>
                  <select
                    id="inputGenero"
                    name="idgenero"
                    value={producto.idgenero}
                    onChange={handleChange}
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
                    name="descripcion"
                    placeholder="Descripción"
                    value={producto.descripcion}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="inputClasificacion">Clasificación:</label>
                  <select
                    id="inputClasificacion"
                    name="idclasificacion"
                    value={producto.idclasificacion}
                    onChange={handleChange}
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
                    name="p_movie"
                    placeholder="Precio"
                    value={producto.p_movie}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="buttons-editproducto">
                  <button className="button-regis-editproducto guardar" type="submit">Guardar</button>
                  <button className="button-regis-editproducto cancelar" type="button" onClick={() => navigate('/admin/productos/listado')}>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditarProductoComponent;
