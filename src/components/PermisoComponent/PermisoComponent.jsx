import React, { useState, useEffect } from "react";
import "./PermisoComponent.css";

const PermisoComponent = () => {
  const [permisos, setPermisos] = useState([]);
  const [nompermiso, setNomPermiso] = useState("");
  const [clave, setClave] = useState("");
  const [permisoAEliminar, setPermisoAEliminar] = useState(null); // Estado para manejar el permiso a eliminar
  const [permisoAEditar, setPermisoAEditar] = useState(null); // Estado para manejar el permiso a editar

  // Función para obtener todos los permisos desde el backend
  const obtenerPermisos = async () => {
    try {
      const response = await fetch("http://localhost:4000/permiso"); // Ruta GET para obtener permisos
      const data = await response.json();
      setPermisos(data);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
  };

  // Función para crear un nuevo permiso
  const crearPermiso = async () => {
    try {
      const response = await fetch("http://localhost:4000/permiso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nompermiso, clave }),
      });
      const data = await response.json();
      console.log("Permiso creado:", data);
      obtenerPermisos(); // Actualiza la lista de permisos después de crear uno nuevo
      setNomPermiso("");
      setClave("");
    } catch (error) {
      console.error("Error al crear permiso:", error);
    }
  };

  // Función para actualizar un permiso existente
  const actualizarPermiso = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/permiso/${permisoAEditar._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nompermiso, clave }),
        }
      );
      const data = await response.json();
      console.log("Permiso actualizado:", data);
      obtenerPermisos(); // Actualiza la lista de permisos después de actualizar uno
      setNomPermiso("");
      setClave("");
      setPermisoAEditar(null);
    } catch (error) {
      console.error("Error al actualizar permiso:", error);
    }
  };

  // Función para eliminar un permiso
  const eliminarPermiso = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/permiso/${permisoAEliminar}`,
        {
          method: "DELETE",
        }
      );
      console.log("Permiso eliminado con éxito");
      obtenerPermisos(); // Actualiza la lista de permisos después de eliminar uno
      setPermisoAEliminar(null); // Resetear el estado del permiso a eliminar
    } catch (error) {
      console.error("Error al eliminar permiso:", error);
    }
  };

  // Efecto para cargar los permisos cuando el componente se monta
  useEffect(() => {
    obtenerPermisos();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nompermiso || !clave) {
      alert("Por favor ingresa nombre y clave del permiso");
      return;
    }
    if (nompermiso.trim() === "" || clave.trim() === "") {
      alert("Nombre y clave del permiso no pueden estar vacíos");
      return;
    }
    if (nompermiso.length > 50) {
      alert("Nombre del permiso demasiado largo (máximo 50 caracteres)");
      return;
    }
    if (clave.length > 20) {
      alert("Clave del permiso demasiado larga (máximo 20 caracteres)");
      return;
    }

    if (permisoAEditar) {
      actualizarPermiso();
    } else {
      crearPermiso();
    }
  };

  return (
    <div className="permiso-container">
      <h1>Crear permiso</h1>
      <form className="permiso-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre del permiso"
          value={nompermiso}
          onChange={(e) => setNomPermiso(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">
          {permisoAEditar ? "Actualizar permiso" : "Guardar permiso"}
        </button>
      </form>
      <ul className="permiso-list">
        {permisos.map((permiso) => (
          <li key={permiso._id} className="permiso-item">
            <span>
              {permiso.nompermiso} - {permiso.clave}
            </span>
            <div className="permiso-buttons">
              <button
                className="edit-per-bt"
                onClick={() => {
                  setPermisoAEditar(permiso);
                  setNomPermiso(permiso.nompermiso);
                  setClave(permiso.clave);
                }}
              >
                Editar
              </button>
              <button
                className="elimi-per-bt"
                onClick={() => setPermisoAEliminar(permiso._id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {permisoAEliminar && (
        <div className="modal-per">
          <div className="modal-per-content">
            <p>¿Estás seguro de que deseas eliminar este permiso?</p>
            <button className="confirm-per-button" onClick={eliminarPermiso}>
              Confirmar
            </button>
            <button
              className="cancel-per-button"
              onClick={() => setPermisoAEliminar(null)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
      {permisoAEditar && (
        <div className="modal-per">
          <div className="per-form-mo">
            <p>Editando permiso: {permisoAEditar.nompermiso}</p>
            <input
              type="text"
              placeholder="Nuevo nombre del permiso"
              value={nompermiso}
              onChange={(e) => setNomPermiso(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nueva clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
            />
            <div>
              <button
                className="confirm-per-button"
                onClick={actualizarPermiso}
              >
                Guardar
              </button>
              <button
                className="cancel-per-button"
                onClick={() => {
                  setPermisoAEditar(null);
                  setNomPermiso("");
                  setClave("");
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

export default PermisoComponent;
