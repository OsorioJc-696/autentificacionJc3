
import 'tailwindcss/tailwind.css'; 
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const ProductDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    const fetchProductById = async (productId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/productos/${productId}`);
        const data = await response.json();
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener los detalles del producto:', error);
      }
    };

    if (id) {
      fetchProductById(id);
    }
  }, [id]);

  const handleGoHomeClick = () => {
    router.push('/');
  };
  const handlePrevClick = () => {
    if (parseInt(id) === 1) {
      return;
    }
    router.push(`/producto/${parseInt(id) - 1}`);

  };
  const handleNextClick = () => {
    if (parseInt(id) === 20) {
      return;
    }
    router.push(`/producto/${parseInt(id) + 1}`);
  }
  if (!producto) {
    return <p>Cargando detalles del producto...</p>;
  }

  return (
    <div className=" mx-auto min-h-screen h-100 p-8 bg-slate-600">
      
      <div className='flex justify-around  text-white font-bold py-2 px-4 rounded'>
      <div className=' bg-teal-900 hover:bg-teal-950 border-2 p-2 rounded-s-3xl rounded-e-xl'>
        <button onClick={handlePrevClick}
        >
          &#128281;
        </button>
      </div>
      <div className='bg-cyan-900 hover:bg-cyan-950 border-2 p-2  rounded-xl'>
      <button  onClick={handleGoHomeClick} 
        
      >
        &#127968;
      </button>
      </div>
      <div className='bg-sky-900 hover:bg-sky-950 border-2 p-2 rounded-e-3xl rounded-s-xl'> 
        <button onClick={handleNextClick}
        >
          &#128284;
        </button>
      </div>
      </div>
        <div className='text-center mb-8 mt-3'>
        <h1 className="text-5xl font-bold">Datos del Producto</h1>
        </div>
     
      <div className='w-auto grid sm:grid-cols-2 border-8 border-b-slate-900 rounded p-5 gap-6'>
        <div className='flex justify-center items-center '>
          <img 
            src={producto.fotografia} 
            alt={producto.nombre} 
            className='rounded-2xl border-2 hover:transform hover:scale-110 transition duration-300 ease-in-out'
            style={{ width: '430px', height: '430px', objectFit: 'cover' }} 
          />
        </div>

        <div className='grid grid-cols-2'>
         
          <h2 className="text-xl font-bold">ID del producto:</h2>
          <p className=''>{producto.id}</p>
          <h2 className="text-xl font-bold">Marca:</h2>
          <p>{producto.marca}</p>
          <h2 className="text-xl font-bold">Modelo:</h2>
          <p>{producto.modelo}</p>
          <h2 className="text-xl font-bold">Garantía:</h2>
          <p>{producto.garantia}</p>
          <h2 className="text-xl font-bold">Color:</h2>
          <p>{producto.color}</p>
          <h2 className="text-xl font-bold">Voltaje:</h2>
          <p>{producto.voltaje}</p>
          <h2 className="text-xl font-bold">Alto:</h2>
          <p>{producto.alto}</p>
          <h2 className="text-xl font-bold">Ancho:</h2>
          <p>{producto.ancho}</p>
          <h2 className="text-xl font-bold">Profundidad:</h2>
          <p>{producto.profundidad}</p>
          <h2 className="text-xl font-bold">Eficiencia Energética:</h2>
          <p>{producto.eficienciaEnergetica}</p>
          <h2 className="text-xl font-bold">Peso:</h2>
          <p>{producto.peso}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
