import React, { useState, useEffect } from 'react';
import './RegistroUserComponent.css';
import { useNavigate } from 'react-router-dom';

function RegistroUserComponent() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [edad, setEdad] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [roles, setRoles] = useState([]);

  useEffect(() => {

    fetch("http://localhost:4000/roles")
      .then((response) => response.json())
      .then((data) => {
        setRoles(data);
       
        if (data.length > 0) {
          const adminRole = data.find(role => role._id === "6655fffe03c0d12c9dff1f3f");
          setSelectedRole(adminRole ? adminRole._id : data[0]._id);
        }
      })
      .catch((error) => console.error("Error al obtener roles: ", error));
  }, []);

  const sendData = () => {
    const dataToSend = {
      user: user,
      email: email,
      password: password,
      edad: edad,
      idrol: selectedRole
    };

    const settings = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    };

    fetch("http://localhost:4000/users", settings)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.message || "Error en la solicitud");
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta: ", data);
        alert("Datos enviados exitosamente");
        navigate("/admin/usuarios/listado");
      })
      .catch((error) => {
        console.error("Error: ", error.message);
        alert(`Error: ${error.message}`);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let error = false;

    if (user.length < 5) {
      error = true;
      alert("No olvides introducir correctamente los datos");
    }

    if (password.length < 5) {
      error = true;
      alert("La contraseña debe tener al menos 5 caracteres");
    }

    if (!error) {
      sendData();
    }
  };

  return (
    <div className="login-page-agregar">
      <div className="formR-agregar">
        <h2>Registrar Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="user"
              id="inputNombre"
              placeholder="Usuario"
              value={user}
              onChange={(event) => setUser(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              id="inputCorreo"
              placeholder="Correo"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="number"
              name="edad"
              id="inputEdad"
              placeholder="Edad"
              value={edad}
              onChange={(event) => setEdad(event.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="inputPassword"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <div>
            <select
              name="idrol"
              id="inputRole"
              value={selectedRole}
              onChange={(event) => setSelectedRole(event.target.value)}
              required
            >
              {roles.map((role) => (
                <option key={role._id} value={role._id}>
                  {role._id === "6655fffe03c0d12c9dff1f3f" ? "Administrador" : "Cliente"}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons-agregar">
            <button className="button-regis-agregar" type="submit">Crear</button>
          </div>
          <p className="message"><a href="/admin/usuarios/listado">Volver al perfil</a></p>
        </form>
      </div>
    </div>
  );
}

export default RegistroUserComponent;
