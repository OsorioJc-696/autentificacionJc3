import React, { useState } from 'react';

const UserList = ({ users, setUsers }) => {
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUserData, setUpdatedUserData] = useState({});

  const handleEdit = (userId, userData) => {
    setEditingUserId(userId);
    setUpdatedUserData(userData);
  };

  const handleSave = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedUserData),
    })
      .then(response => {
        if (response.ok) {
          console.log(`Usuario con ID ${userId} actualizado con éxito`);
          return response.json();
        } else {
          throw new Error('Error al actualizar el usuario');
        }
      })
      .then(updatedUser => {
        setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
        setEditingUserId(null);
      })
      .catch(error => {
        console.error('Error al actualizar el usuario:', error);
      });
  };

  const handleCancel = () => {
    setEditingUserId(null);
  };

  const handleDelete = (userId) => {
    fetch(`http://localhost:8080/api/usuarios/${userId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          setUsers(prevUsers =>
            prevUsers.filter(user => user.id !== userId)
          );
        } else {
          throw new Error('Error al eliminar el usuario');
        }
      })
      .catch(error => {
        console.error('Error al eliminar el usuario:', error);
      });
  };

  const handleInputChange = (e, field) => {
    setUpdatedUserData(prevData => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {users.map(user => (
        <div key={user.id} className="bg-white p-4 rounded shadow">
          <div className=''>
            <p className="text-black font-bold">ID: {user.id}</p>
            <p className="text-black">Nombre: {user.username}</p>
            <p className="text-black">Email: {user.email}</p>
          </div>

          <div className="flex  mt-2   justify-center">
            {editingUserId === user.id ? (
              <div className="flex  flex-col rounded-2xl my-2 items-center">
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedUserData.username}
                  onChange={e => handleInputChange(e, 'username')}
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedUserData.email}
                  onChange={e => handleInputChange(e, 'email')}
                />
                <div className="flex items-center">
                <button
                  className="bg-green-500 hover:bg-green-700 my-1 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleSave(user.id)}
                >
                  Guardar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center">
                <button
                  className="bg-yellow-500 hover:bg-yellow-700 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEdit(user.id, user)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserList;
