import React, { useState, useEffect } from 'react';
import './RolComponent.css';

const RolComponent = () => {
  const [roles, setRoles] = useState([]);
  const [nomrol, setNomRol] = useState('');
  const [rolAEliminar, setRolAEliminar] = useState(null); // Estado para manejar el rol a eliminar

  // Función para obtener todos los roles desde el backend
  const obtenerRoles = async () => {
    try {
      const response = await fetch('http://localhost:4000/roles'); // Ruta GET para obtener roles
      const data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error('Error al obtener roles:', error);
    }
  };

  // Función para crear un nuevo rol
  const crearRol = async () => {
    try {
      const response = await fetch('http://localhost:4000/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomrol }),
      });
      const data = await response.json();
      console.log('Rol creado:', data);
      obtenerRoles(); // Actualiza la lista de roles después de crear uno nuevo
      setNomRol('');
    } catch (error) {
      console.error('Error al crear rol:', error);
    }
  };

  // Función para actualizar un rol existente
  const actualizarRol = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/roles/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nomrol }),
      });
      const data = await response.json();
      console.log('Rol actualizado:', data);
      obtenerRoles(); // Actualiza la lista de roles después de actualizar uno
      setNomRol('');
    } catch (error) {
      console.error('Error al actualizar rol:', error);
    }
  };

  // Función para eliminar un rol
  const eliminarRol = async () => {
    try {
      const response = await fetch(`http://localhost:4000/roles/${rolAEliminar}`, {
        method: 'DELETE',
      });
      console.log('Rol eliminado con éxito');
      obtenerRoles(); // Actualiza la lista de roles después de eliminar uno
      setRolAEliminar(null); // Resetear el estado del rol a eliminar
    } catch (error) {
      console.error('Error al eliminar rol:', error);
    }
  };

  // Efecto para cargar los roles cuando el componente se monta
  useEffect(() => {
    obtenerRoles();
  }, []);

  return (
    <div className="rol-container">
      <h1>Crear rol</h1>
      <form className="rol-form" onSubmit={(e) => {
        e.preventDefault();
        if (!nomrol) {
          alert('Por favor ingresa nombre del rol');
          return;
        }
        if (nomrol.trim() === '') {
          alert('Nombre del rol no puede estar vacío');
          return;
        }
        if (nomrol.length > 50) {
          alert('Nombre del rol demasiado largo (máximo 50 caracteres)');
          return;
        }

        // Determinar si se va a crear o actualizar el rol
        const rolExistente = roles.find(rol => rol.nomrol === nomrol);
        if (rolExistente) {
          actualizarRol(rolExistente._id);
        } else {
          crearRol();
        }
      }}>
        <input
          type="text"
          placeholder="Nombre del rol"
          value={nomrol}
          onChange={(e) => setNomRol(e.target.value)}
          required
        />
        <button type="submit">Guardar rol</button>
      </form>
      <ul className="rol-list">
        {roles.map((rol) => (
          <li key={rol._id} className='rol-item'>
            <span>{rol.nomrol}</span>
            <div className='rol-buttons'>
              <button className='edit-rol-bt' onClick={() => setRolAEliminar(rol._id)}>Eliminar</button>
              <button className='elimi-rol-bt'onClick={() => setNomRol(rol.nomrol)}>Editar</button>
            </div>
          </li>
        ))}
      </ul>
      {rolAEliminar && (
        <div className="modal-rol">
          <div className="modal-rol-content">
            <p>¿Estás seguro de que deseas eliminar este rol?</p>
            <button className="confirm-rol-button" onClick={eliminarRol}>Confirmar</button>
            <button className="cancel-rol-button" onClick={() => setRolAEliminar(null)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolComponent;