import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListadoProductosComponent.css';

function ListadoProductosComponent() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [movieToDelete, setMovieToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:4000/movie');
        const data = await response.json();
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin/movies/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    setMovieToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/eliminar/movie/${movieToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMovies(movies.filter(movie => movie._id !== movieToDelete));
        setMovieToDelete(null);
      } else {
        console.error('Error al eliminar la película');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddMovieClick = () => {
    navigate('/admin/movies/agregar');
  };

  return (
    <div className="App-movie">
      <header className="App-header-movie">
        <h1 className="title-movie-2">Películas</h1>
      </header>
      <div className="add-movie-button-container-movie">
        <button className="add-movie-button-movie" onClick={handleAddMovieClick}>Agregar película</button>
      </div>
      <div className="table-container-movie table-wrapper-movie">
        {isLoading ? (
          <p>Cargando...</p>
        ) : (
          <table className="table-movie">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Género</th>
                <th>Descripción</th>
                <th>Clasificación</th>
                <th>Precio</th>
                <th>Imagen</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {movies.map((producto) => (
                <tr key={producto._id}>
                  <td>{producto._id}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.idgenero}</td>
                  <td className="descripcion-column">{producto.descripcion}</td>
                  <td>{producto.idclasificacion}</td>
                  <td>{producto.p_movie}</td>
                  <td><img src={`http://localhost:4000/${producto.foto}`} alt={producto.nombre} className="movie-image" /></td>
                  <td>
                    <button className="edit-button-movie" onClick={() => handleEditClick(producto._id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="delete-button-movie" onClick={() => handleDeleteClick(producto._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {movieToDelete && (
        <div className="modal-movie">
          <div className="modal-content-movie">
            <p>¿Estás seguro de que deseas eliminar esta película?</p>
            <button className="confirm-button-movie" onClick={confirmDelete}>Confirmar</button>
            <button className="cancel-button-movie" onClick={() => setMovieToDelete(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListadoProductosComponent;
