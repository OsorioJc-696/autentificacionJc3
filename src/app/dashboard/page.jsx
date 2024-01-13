
"use client"
import React, { useEffect, useState } from 'react';
import UserList from './UserList';
import NewProductForm from './NewProductForm';
import ProductList from './ProductList';

function DashboardPage() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeComponent, setActiveComponent] = useState('users');

  useEffect(() => {
    // Carga de usuarios
    fetch('http://localhost:8080/api/usuarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los usuarios');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
      })
      .catch(error => {
        console.error('Error al obtener los usuarios:', error);
      });

    // Carga de productos
    fetch('http://localhost:8080/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
      });
  }, []);

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-800 text-white">
      <div className="container mx-auto">
        <h1 className="text-5xl text-center mb-8">Dashboard</h1>

        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-3 rounded-full focus:outline-none transition duration-300 ${
              activeComponent === 'users'
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleComponentChange('users')}
          >
            Usuarios
          </button>
          <button
            className={`px-6 py-3 rounded-full focus:outline-none transition duration-300 ${
              activeComponent === 'newProduct'
                ? 'bg-cyan-600 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleComponentChange('newProduct')}
          >
            Nuevo Producto
          </button>
          <button
            className={`px-6 py-3 rounded-full focus:outline-none transition duration-300 ${
              activeComponent === 'products'
                ? 'bg-cyan-800 text-white'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => handleComponentChange('products')}
          >
            Productos
          </button>
        </div>

        {activeComponent === 'users' && (
          <div className='mx-auto'>
            <UserList users={users} setUsers={setUsers} />
          </div>
        )}

        {activeComponent === 'newProduct' && (
          <div className="my-8">
            <NewProductForm setProducts={setProducts} />
          </div>
        )}

        {activeComponent === 'products' && (
          <div className='mx-auto'>
            <ProductList products={products} setProducts={setProducts} />
          </div>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;
