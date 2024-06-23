import React, { useState, useEffect, useContext } from 'react';
import './EditUserComponent.css';
import LogoSinFondo from "../../assets/LogoSinFondo.png";
import { UserContext } from '../../contexts/UserContext';
import { useNavigate, useParams } from 'react-router-dom';

const EditUserComponent = () => {
  const { id } = useParams(); // Obtener el ID del usuario de los parámetros de la URL
  const { user: usuario, setUser } = useContext(UserContext);
  const [userState, setUserState] = useState(usuario.user);
  const [email, setEmail] = useState(usuario.email);
  const [password, setPassword] = useState(usuario.password);
  const [edad, setEdad] = useState(usuario.edad);
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario) {
      setUserState(usuario.user);
      setEmail(usuario.email);
      setPassword(usuario.password);
      setEdad(usuario.edad);

      if (id) { // Verificar si el ID está definido antes de hacer la solicitud
        // Fetch user details including password
        fetch(`http://localhost:4000/users/${id}`)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Failed to fetch user details');
            }
          })
          .then(data => {
            if (data) {
              setPassword(data.password);
            }
          })
          .catch(error => console.error('Error fetching user details:', error));
      }
    }
  }, [usuario, id]);

  const editarUsuario = async (e) => {
    e.preventDefault();

    if (!id) {
      console.error("El ID del usuario no está definido.");
      return;
    }

    const objetoParaBackend = {
      user: userState,
      email,
      password,
      edad,
    };

    try {
      const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(objetoParaBackend),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta:", data);
        setUser(data); // Update the user context with the new data
        navigate('/perfil'); // Redirigir al perfil después de la actualización
      } else {
        throw new Error("Error en la solicitud.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!usuario) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="edit-user-page">
      <div className="formL">
        <form onSubmit={editarUsuario}>
          <div className="img-sm">
            <img src={LogoSinFondo} alt="LogoL" />
          </div>
          <div>
            <input
              className="input-box"
              type="text"
              name="user"
              value={userState}
              onChange={(e) => setUserState(e.target.value)}
              placeholder="Nombre"
              required
            />
          </div>
          <div>
            <input
              className="input-box"
              type="email"
              name="email"
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
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <div>
            <input
              className="input-box"
              type="number"
              name="edad"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              min={15}
              max={90}
              placeholder="Edad"
              required
            />
          </div>
          <button type="submit">Actualizar</button>
          <br />
          <br />
          <p className="text-black"><a href="/perfil">Volver al perfil</a></p>
        </form>
      </div>
    </div>
  );
};

export default EditUserComponent;
