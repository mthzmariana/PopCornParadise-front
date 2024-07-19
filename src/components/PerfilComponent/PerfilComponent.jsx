import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import './PerfilComponent.css';
import defaultProfilePhoto from '../../assets/PerfilFoto2.png';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import { NavLink, useNavigate } from 'react-router-dom';

const PerfilComponent = () => {
  const { user, setUser } = useContext(UserContext);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  console.log('Usuario en PerfilComponent:', user);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        if (user && user._id) {
          const moviesResponse = await axios.get(`http://localhost:4000/pelicula-comprada/${user._id}`);
          setMovies(moviesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [user]);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:4000/logout', {
        remember_token: user.remember_token 
      });
      if (response.status === 200) {
        const confirmLogout = window.confirm('¿Seguro quieres cerrar la sesión?');
        if (confirmLogout) {
          setUser(null); 
          alert('Sesión cerrada exitosamente');
          navigate('/login'); 
        }
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert('Hubo un error al cerrar sesión');
    }
  };

  if (!user) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="perfil-container">
      <div className="perfil-sidebar">
        <div className="perfil-info">
          <div className="perfil-avatar">
            <img src={user.avatarUrl || defaultProfilePhoto} alt="Avatar" />
          </div>
          <div className="perfil-details">
            <h2>{user.user}</h2>
            <p>Correo: {user.email}</p>
            <p>Contraseña: *********</p>
            <p>Edad: {user.edad}</p>
          </div>
          <div className="perfil-buttons">
    <Link to={`/editar-perfil/${user._id}`} className="btn-link">
        <button className="btn-edit">Editar perfil</button>
    </Link>
    <button className="btn-logout" onClick={handleLogout}>Cerrar sesión</button>
</div>


        </div>
      </div>
      <div className="perfil-main">
        <div className="movies">
          {movies.map((movie, index) => (
            <div key={index} className="movie-item">
              <p>{movie.nombre}</p>
              <img
                src={'src/assets/' + movie.foto}
                alt={movie.nombre}
                onError={(e) => { e.target.src = ''; }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerfilComponent;
