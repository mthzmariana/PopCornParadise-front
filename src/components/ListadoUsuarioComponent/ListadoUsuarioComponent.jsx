import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListadoUsuarioComponent.css';

function ListadoUsuarioComponent() {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userToDelete, setUserToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await fetch('http://localhost:4000/users');
        const data = await response.json();
        setUsuarios(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        setIsLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  const handleEditClick = (id) => {
    navigate(`/admin/usuarios/editar/${id}`);
  };

  const handleDeleteClick = (id) => {
    setUserToDelete(id);
  };

  const confirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:4000/eliminar/users/${userToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setUsuarios(usuarios.filter(user => user._id !== userToDelete));
        setUserToDelete(null);
      } else {
        console.error('Error al eliminar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleAddUserClick = () => {
    navigate('/admin/usuarios/agregar');
  };

  return (
    <div>
      <div className="App">
        <header className="App-header">
          <h1 className="title">Usuarios</h1>
        </header>
        <div className="add-user-button-container">
          <button className="add-user-button" onClick={handleAddUserClick}>Agregar Usuario</button>
        </div>
        <div className="table-container table-wrapper">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Contraseña</th>
                <th>Edad</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario._id}>
                  <td>{usuario._id}</td>
                  <td>{usuario.user}</td>
                  <td>{usuario.email}</td>
                  <td>******</td>
                  <td>{usuario.edad}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(usuario._id)}>
                      Editar
                    </button>
                  </td>
                  <td>
                    <button className="delete-button" onClick={() => handleDeleteClick(usuario._id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {userToDelete && (
          <div className="modal">
            <div className="modal-content">
              <p>¿Estás seguro de que deseas eliminar este usuario?</p>
              <button className="confirm-button" onClick={confirmDelete}>Confirmar</button>
              <button className="cancel-button" onClick={() => setUserToDelete(null)}>Cancelar</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ListadoUsuarioComponent;
