"use client"
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from 'next/link';

// Importa las bibliotecas y componentes necesarios

function HomePage() {
  const [productos, setProductos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 20;

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

  const DatosProductos = ({ producto, index }) => (
    <Link href={`/producto/${producto.id}`}>
    <div className="bg-black p-4 rounded shadow mb-4">
      <div className='flex justify-center'>
      <img
        src={producto.fotografia}
        alt={`Imagen de ${producto.modelo}`}
        className="w-100 h-100 object-cover mb-4 rounded hover:transform hover:scale-125 transition duration-400 ease-in-out hover:rounded-full"
      />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{producto.modelo}</h3>
      <p className="text-gray-600">Marca: {producto.marca}</p>

          <p className="text-gray-600">Garantía: {producto.garantia}</p>
          <p className="text-gray-600">Color: {producto.color}</p>
          <p className="text-gray-600">Voltaje: {producto.voltaje}</p>
          <p className="text-gray-600">Alto: {producto.alto}</p>
          <p className="text-gray-600">Ancho: {producto.ancho}</p>
          <p className="text-gray-600">Profundidad: {producto.profundidad}</p>
          <p className="text-gray-600">Eficiencia Energética: {producto.eficienciaEnergetica}</p>
          <p className="text-gray-600">Peso: {producto.peso}</p>
    </div>
    </Link>
  );

  const startIndex = currentPage * productsPerPage;
  const visibleProducts = productos.slice(startIndex, startIndex + productsPerPage);

  return (
    <Router>
      <div className="bg-gray-900">
        <nav className="bg-slate-500 p-4">
          <h1 className="text-slate-900  text-center text-6xl font-mono font-extrabold">Home</h1>
        </nav>
        <section className="my-10 px-8">
          <div className='rounded border-2 w-auto flex justify-center mb-5 hover:cursor-pointer hover:bg-black'>
          <button onClick={handlePrev} className="text-white mr-2" disabled={currentPage === 0}>
              Prev
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4  lg:grid-cols-5 xl:grid-cols-6 gap-8">
            {visibleProducts.map((producto, index) => (
              <DatosProductos key={index} producto={producto} index={index} />
            ))}
          </div>
          <div className="rounded border-2 w-auto flex justify-center mb-5 hover:bg-slate-800">
           
            <button onClick={handleNext} className="text-white" disabled={currentPage === totalPages - 1}>
              Next
            </button>
          </div>
        </section>
      </div>
    </Router>
  );
}

export default HomePage;
