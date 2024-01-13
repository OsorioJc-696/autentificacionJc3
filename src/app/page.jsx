"use client" 

import React, { useEffect, useState } from 'react';

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 20;
  const itemsPerRow = 4;
  const rowsPerPage = 5;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await fetch('http://localhost:8080/api/productos');
        const datos = await respuesta.json();
        setProductos(datos);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };

    obtenerProductos();
  }, []);

  const totalPages = Math.ceil(productos.length / productsPerPage);

  const handleNext = () => {
    setCurrentPage((prevPage) => (prevPage + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages);
  };

  // Lógica para calcular qué productos mostrar en la página actual
  const startIndex = currentPage * productsPerPage;
  const visibleProducts = productos.slice(startIndex, startIndex + productsPerPage);

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <h1 className="text-white text-5xl">INICIO</h1>

        <div className="mt-8">
          <h2 className="text-3xl text-white mb-4">Catálogo</h2>

          {/* Carrusel */}
          <div className="flex flex-col items-center">
            <button onClick={handlePrev} className="mb-2 text-white" disabled={currentPage === 0}>
              Prev
            </button>
            <div className="grid grid-cols-4 gap-4">
              {visibleProducts.map((producto, index) => (
                <div key={index} className="bg-white p-4 rounded shadow">
                  <img
                    src={producto.fotografia}
                    alt={`Imagen de ${producto.modelo}`}
                    className="w-full h-32 object-cover mb-4 rounded"
                  />
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{producto.modelo}</h3>
                  <p className="text-gray-600">Marca: {producto.marca}</p>
                  <p className="text-gray-600">Color: {producto.color}</p>
                  <p className="text-gray-600">Alto: {producto.alto}</p>
                  <p className="text-gray-600">Ancho: {producto.ancho}</p>
                  <p className="text-gray-600">Eficiencia Energética: {producto.eficiencia_energetica}</p>
                  <p className="text-gray-600">Garantía: {producto.garantia}</p>
                  <p className="text-gray-600">Peso: {producto.peso}</p>
                  <p className="text-gray-600">Profundidad: {producto.profundidad}</p>
                  <p className="text-gray-600">Voltaje: {producto.voltaje}</p>
                </div>
              ))}
            </div>

            <button onClick={handleNext} className="mt-2 text-white" disabled={currentPage === totalPages - 1}>
              Next
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
