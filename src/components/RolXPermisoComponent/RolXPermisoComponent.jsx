import React, { useState, useEffect } from "react";
import "./RolXPermisoComponent.css";

const RolXPermisoComponent = () => {
  const [rolxpermisos, setRolxPermisos] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permisos, setPermisos] = useState([]);
  const [idrol, setIdRol] = useState("");
  const [idpermiso, setIdPermiso] = useState("");
  const [rolxPermisoAEliminar, setRolxPermisoAEliminar] = useState(null);
  const [rolxPermisoAEditar, setRolxPermisoAEditar] = useState(null);

  const obtenerRolxPermisos = async () => {
    try {
      const response = await fetch("http://localhost:4000/rolxpermiso");
      const data = await response.json();
      setRolxPermisos(data);
    } catch (error) {
      console.error("Error al obtener roles por permiso:", error);
    }
  };

  const obtenerRoles = async () => {
    try {
      const response = await fetch("http://localhost:4000/roles");
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error("Error al obtener roles:", error);
    }
  };

  // Obtener todos los permisos
  const obtenerPermisos = async () => {
    try {
      const response = await fetch("http://localhost:4000/permiso");
      const data = await response.json();
      setPermisos(data);
    } catch (error) {
      console.error("Error al obtener permisos:", error);
    }
  };

  // Creación de nuevo rol x permiso
  const crearRolxPermiso = async () => {
    try {
      const response = await fetch("http://localhost:4000/rolxpermiso", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idrol, idpermiso }),
      });
      const data = await response.json();
      console.log("Rol por permiso creado:", data);
      obtenerRolxPermisos();
      setIdRol("");
      setIdPermiso("");
    } catch (error) {
      console.error("Error al crear rol por permiso:", error);
    }
  };

  // Actualizar un rol x permiso existente
  const actualizarRolxPermiso = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/rolxpermiso/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idrol, idpermiso }),
      });
      const data = await response.json();
      console.log("Rol por permiso actualizado:", data);
      obtenerRolxPermisos();
      setIdRol("");
      setIdPermiso("");
      setRolxPermisoAEditar(null);
    } catch (error) {
      console.error("Error al actualizar rol por permiso:", error);
    }
  };

  // Función para eliminar un rol por permiso
  const eliminarRolxPermiso = async () => {
    try {
      const response = await fetch(`http://localhost:4000/rolxpermiso/${rolxPermisoAEliminar}`, {
        method: "DELETE",
      });
      console.log("Rol por permiso eliminado con éxito");
      obtenerRolxPermisos();
      setRolxPermisoAEliminar(null);
    } catch (error) {
      console.error("Error al eliminar rol por permiso:", error);
    }
  };

  useEffect(() => {
    obtenerRolxPermisos();
    obtenerRoles();
    obtenerPermisos();
  }, []);

  return (
    <div className="rolx-container">
      <h1>Roles y permisos</h1>
      <form
        className="rolx-form"
        onSubmit={(e) => {
          e.preventDefault();
          if (!idrol || !idpermiso) {
            alert("Por favor selecciona un rol y un permiso");
            return;
          }

          const rolxPermisoExistente = rolxpermisos.find(
            (item) => item.idrol === idrol && item.idpermiso === idpermiso
          );
          if (rolxPermisoExistente) {
            alert("Ya existe un rol por permiso con esta combinación");
            return;
          }

          crearRolxPermiso();
        }}
      >
        <select value={idrol} onChange={(e) => setIdRol(e.target.value)} required>
          <option value="">Selecciona un rol</option>
          {roles.map((rol) => (
            <option key={rol._id} value={rol._id}>
              {rol.nomrol}
            </option>
          ))}
        </select>
        <select value={idpermiso} onChange={(e) => setIdPermiso(e.target.value)} required>
          <option value="">Selecciona un permiso</option>
          {permisos.map((permiso) => (
            <option key={permiso._id} value={permiso._id}>
              {permiso.nompermiso}
            </option>
          ))}
        </select>
        <button type="submit">Crear</button>
      </form>
      <ul className="rolx-list">
        {rolxpermisos.map((item) => (
          <li key={item._id} className="rolx-item">
            <span>
              Rol: {roles.find((rol) => rol._id === item.idrol)?.nomrol || item.idrol} - Permiso: {permisos.find((permiso) => permiso._id === item.idpermiso)?.nompermiso || item.idpermiso}
            </span>
            <div className="rolx-buttons">
              <button className="edit-rolx-bt" onClick={() => setRolxPermisoAEditar(item)}>
                Editar
              </button>
              <button className="elimi-rolx-bt" onClick={() => setRolxPermisoAEliminar(item._id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
      {rolxPermisoAEliminar && (
        <div className="modal-rolx">
          <div className="modal-rolx-content">
            <p>¿Estás seguro de que deseas eliminar este rol por permiso?</p>
            <button className="confirm-rolx-button" onClick={eliminarRolxPermiso}>
              Confirmar
            </button>
            <button className="cancel-rolx-button" onClick={() => setRolxPermisoAEliminar(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
      {rolxPermisoAEditar && (
        <div className="modal-rolx">
          <div className="modal-rolx-content">
            <h2>Editar Rol por Permiso</h2>
            <form
              className="rolx-form-mo"
              onSubmit={(e) => {
                e.preventDefault();
                if (!idrol || !idpermiso) {
                  alert("Por favor selecciona un rol y un permiso");
                  return;
                }
                actualizarRolxPermiso(rolxPermisoAEditar._id);
              }}
            >
              <select value={idrol} onChange={(e) => setIdRol(e.target.value)} required>
                <option value="">Selecciona un rol</option>
                {roles.map((rol) => (
                  <option key={rol._id} value={rol._id}>
                    {rol.nomrol}
                  </option>
                ))}
              </select>
              <select value={idpermiso} onChange={(e) => setIdPermiso(e.target.value)} required>
                <option value="">Selecciona un permiso</option>
                {permisos.map((permiso) => (
                  <option key={permiso._id} value={permiso._id}>
                    {permiso.nompermiso}
                  </option>
                ))}
              </select>
            </form>
            <button className="confirm-rolx-button" type="submit">Actualizar</button>
            <button className="cancel-rolx-button" onClick={() => setRolxPermisoAEditar(null)}>
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolXPermisoComponent;