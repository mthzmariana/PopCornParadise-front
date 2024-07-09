  import React, { useState, useEffect } from 'react';
  import './EditUsuarioComponent.css';
  import LogoSinFondo from '../../assets/LogoSinFondo.png';
  import { useNavigate, useParams } from 'react-router-dom';

  const EditUsuarioComponent = () => {
    const { id } = useParams(); // Obtener el ID del usuario de los parámetros de la URL
    const [userState, setUserState] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [edad, setEdad] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
      if (id) {
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
              setUserState(data.user);
              setEmail(data.email);
              setPassword(data.password);
              setEdad(data.edad);
            }
          })
          .catch(error => console.error('Error fetching user details:', error));
      }
    }, [id]);

    const editarUsuario = async (e) => {
      e.preventDefault();

      const objetoParaBackend = {
        user: userState,
        email,
        password,
        edad,
      };

      try {
        const response = await fetch(`http://localhost:4000/users/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(objetoParaBackend),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Respuesta:', data);
          navigate('/admin/usuarios/listado'); // Redirigir al listado de usuarios después de la actualización
        } else {
          throw new Error('Error en la solicitud.');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    if (!userState || !email || !password || !edad) {
      return <div>Cargando...</div>;
    }

    return (
      
      <div className="edit-user-page-admin">
        <div className="formL-admin">
          
          <form onSubmit={editarUsuario}>
            <div className="img-sm-admin">
              <img src={LogoSinFondo} alt="LogoL-admin" />
            </div>
            <div>
              <input
                className="input-box-admin"
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
                className="input-box-admin"
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
                className="input-box-admin"
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
                className="input-box-admin"
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
            <button type="submit-admin">Actualizar</button>
            <br />
            <br />
            <p className="text-black"><a href="/admin/usuarios/listado">Volver al listado</a></p>
          </form>
        </div>
      </div>
    );
  };

  export default EditUsuarioComponent;
