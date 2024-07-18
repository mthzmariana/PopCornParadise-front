import React, { useState, useEffect } from "react";
import "./RolComponent.css";

const RolComponent = () => {
  const [roles, setRoles] = useState([]);
  const [nomrol, setNomRol] = useState("");
  const [rolAEliminar, setRolAEliminar] = useState(null); // Estado para manejar el rol a eliminar
  const [rolAEditar, setRolAEditar] = useState(null); // Estado para manejar el rol a editar

  // Función para obtener todos los roles desde el backend
  const obtenerRoles = async () => {
    try {
      const response = await fetch("http://localhost:4000/roles"); // Ruta GET para obtener roles
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  // Función para crear un nuevo rol
  const crearRol = async () => {
    try {
      const response = await fetch("http://localhost:4000/roles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nomrol }),
      });
      const data = await response.json();
      console.log("Rol creado:", data);
      obtenerRoles(); // Actualiza la lista de roles después de crear uno nuevo
      setNomRol("");
    } catch (error) {
      console.error("Error al crear rol:", error);
    }
  };

  // Función para actualizar un rol existente
  const actualizarRol = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/roles/${rolAEditar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nomrol }),
        }
      );
      const data = await response.json();
      console.log("Rol actualizado:", data);
      obtenerRoles(); // Actualiza la lista de roles después de actualizar uno
      setNomRol("");
      setRolAEditar(null);
    } catch (error) {
      console.error("Error al actualizar rol:", error);
    }
  };

  // Función para eliminar un rol
  const eliminarRol = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/roles/${rolAEliminar}`,
        {
          method: "DELETE",
        }
      );
      console.log("Rol eliminado con éxito");
      obtenerRoles(); // Actualiza la lista de roles después de eliminar uno
      setRolAEliminar(null); // Resetear el estado del rol a eliminar
    } catch (error) {
      console.error("Error al eliminar rol:", error);
    }
  };

  // Efecto para cargar los roles cuando el componente se monta
  useEffect(() => {
    obtenerRoles();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nomrol) {
      alert("Por favor ingresa nombre del rol");
      return;
    }
    if (nomrol.trim() === "") {
      alert("Nombre del rol no puede estar vacío");
      return;
    }
    if (nomrol.length > 50) {
      alert("Nombre del rol demasiado largo (máximo 50 caracteres)");
      return;
    }

    if (rolAEditar) {
      actualizarRol();
    } else {
      crearRol();
    }
  };

  return (
    <div className="rol-container">
      <h1>Crear rol</h1>
      <form className="rol-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del rol"
          value={nomrol}
          onChange={(e) => setNomRol(e.target.value)}
          required
        />
        <button type="submit">
          {rolAEditar ? "Actualizar rol" : "Guardar rol"}
        </button>
      </form>
      <ul className="rol-list">
        {roles.map((rol) => (
          <li key={rol._id} className="rol-item">
            <span>{rol.nomrol}</span>
            <div className="rol-buttons">
              <button
                className="edit-rol-bt"
                onClick={() => {
                  setRolAEditar(rol);
                  setNomRol(rol.nomrol);
                }}
              >
                Editar
              </button>
              <button
                className="elimi-rol-bt"
                onClick={() => setRolAEliminar(rol._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {rolAEliminar && (
        <div className="modal-rol">
          <div className="modal-rol-content">
            <p>¿Estás seguro de que deseas eliminar este rol?</p>
            <button className="confirm-rol-button" onClick={eliminarRol}>
              Confirmar
            </button>
            <button
              className="cancel-rol-button"
              onClick={() => setRolAEliminar(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {rolAEditar && (
        <div className="modal-rol">
          <div className="rol-form-mo">
            <p>Editando rol: {rolAEditar.nomrol}</p>
            <input
              type="text"
              placeholder="Nuevo nombre del rol"
              value={nomrol}
              onChange={(e) => setNomRol(e.target.value)}
              required
            />
            <div>
              <button className="confirm-rol-button" onClick={actualizarRol}>
                Guardar
              </button>
              <button
                className="cancel-rol-button"
                onClick={() => {
                  setRolAEditar(null);
                  setNomRol("");
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolComponent;