import React, { useState, useEffect } from 'react';
import './RolXPermisoComponent.css';

const RolXPermisoComponent = () => {
  const [rolxpermisos, setRolxPermisos] = useState([]);
  const [idrol, setIdRol] = useState('');
  const [idpermiso, setIdPermiso] = useState('');

  // Función para obtener todos los roles por permiso desde el backend
  const obtenerRolxPermisos = async () => {
    try {
      const response = await fetch('http://localhost:4000/rolxpermiso'); // Ruta GET para obtener roles por permiso
      const data = await response.json();
      setRolxPermisos(data);
    } catch (error) {
      console.error('Error al obtener roles por permiso:', error);
    }
  };

  // Función para crear un nuevo rol por permiso
  const crearRolxPermiso = async () => {
    try {
      const response = await fetch('http://localhost:4000/rolxpermiso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idrol, idpermiso }),
      });
      const data = await response.json();
      console.log('Rol por permiso creado:', data);
      obtenerRolxPermisos(); // Actualiza la lista de roles por permiso después de crear uno nuevo
      setIdRol('');
      setIdPermiso('');
    } catch (error) {
      console.error('Error al crear rol por permiso:', error);
    }
  };

  // Función para actualizar un rol por permiso existente
  const actualizarRolxPermiso = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/rolxpermiso/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idrol, idpermiso }),
      });
      const data = await response.json();
      console.log('Rol por permiso actualizado:', data);
      obtenerRolxPermisos(); // Actualiza la lista de roles por permiso después de actualizar uno
      setIdRol('');
      setIdPermiso('');
    } catch (error) {
      console.error('Error al actualizar rol por permiso:', error);
    }
  };

  // Función para eliminar un rol por permiso
  const eliminarRolxPermiso = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/rolxpermiso/${id}`, {
        method: 'DELETE',
      });
      console.log('Rol por permiso eliminado con éxito');
      obtenerRolxPermisos(); // Actualiza la lista de roles por permiso después de eliminar uno
    } catch (error) {
      console.error('Error al eliminar rol por permiso:', error);
    }
  };

  // Efecto para cargar los roles por permiso cuando el componente se monta
  useEffect(() => {
    obtenerRolxPermisos();
  }, []);

  return (
    <div className="rolxpermiso-container">
      <h1>Roles y permisos</h1>
      <form className="rolxpermiso-form" onSubmit={(e) => {
        e.preventDefault();
        if (!idrol || !idpermiso) {
          alert('Por favor selecciona un rol y un permiso');
          return;
        }

        // Determinar si se va a crear o actualizar el rol por permiso
        const rolxPermisoExistente = rolxpermisos.find(item => item.idrol === idrol && item.idpermiso === idpermiso);
        if (rolxPermisoExistente) {
          alert('Ya existe un rol por permiso con esta combinación');
          return;
        }

        const idrolValid = mongoose.Types.ObjectId.isValid(idrol);
        const idpermisoValid = mongoose.Types.ObjectId.isValid(idpermiso);

        if (!idrolValid || !idpermisoValid) {
          alert('Los IDs de rol y permiso deben ser válidos');
          return;
        }

        // Determinar si se va a crear o actualizar el rol por permiso
        if (rolxPermisoExistente) {
          actualizarRolxPermiso(rolxPermisoExistente._id);
        } else {
          crearRolxPermiso();
        }
      }}>
        <select
          value={idrol}
          onChange={(e) => setIdRol(e.target.value)}
          required
        >
          <option value="">Selecciona un rol</option>
          {/* Opciones de roles podrían ser obtenidas de otro endpoint */}
          {/* Ejemplo de hardcoded options */}
          <option value="6655fffe03c0d12c9dff1f3f">Administrador</option>
          <option value="665600b703c0d12c9dff1f40">Cliente</option>
        </select>
        <select
          value={idpermiso}
          onChange={(e) => setIdPermiso(e.target.value)}
          required
        >
          <option value="">Selecciona un permiso</option>
          {/* Opciones de permisos podrían ser obtenidas de otro endpoint */}
          {/* Ejemplo de hardcoded options */}
          <option value="6656018c03c0d12c9dff1f42">Administrar</option>
          <option value="665601c203c0d12c9dff1f43">Usuario</option>
        </select>
        <button type="submit">Guardar Rol x Permiso</button>
      </form>
      <ul className="rolxpermiso-list">
        {rolxpermisos.map((item) => (
          <li key={item._id}>
            Rol: {item.idrol} - Permiso: {item.idpermiso}
            <button onClick={() => eliminarRolxPermiso(item._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RolXPermisoComponent;