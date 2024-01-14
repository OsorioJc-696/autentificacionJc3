// \src\app\dashboard\ProductList.jsx
import React, { useState } from 'react';
import Link from 'next/link';
const ProductList = ({ products, setProducts }) => {
  const [editingProductId, setEditingProductId] = useState(null);
  const [updatedProductData, setUpdatedProductData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 20;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleEdit = (productId, productData) => {
    setEditingProductId(productId);
    setUpdatedProductData(productData);
  };

  const handleInputChange = (e, field) => {
    setUpdatedProductData((prevData) => ({
      ...prevData,
      [field]: e.target.value,
    }));
  };

  const handleSave = (productId) => {
    const updatedProductIndex = products.findIndex((product) => product.id === productId);
    const updatedProducts = [...products];
    updatedProducts[updatedProductIndex] = {
      ...updatedProducts[updatedProductIndex],
      ...updatedProductData,
    };
    setProducts(updatedProducts);
    setEditingProductId(null);

    // Envía los datos al servidor
    fetch(`http://localhost:8080/api/productos/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al actualizar el producto en el servidor');
        }
      })
      .catch((error) => {
        console.error('Error al actualizar el producto:', error);
      });
  };

  const handleCancel = () => {
    setEditingProductId(null);
  };

  const handleDelete = (productId) => {
    console.log(`Eliminar producto con ID ${productId}`);

    // Agrega lógica para eliminar el producto en el servidor
    fetch(`http://localhost:8080/api/productos/${productId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al eliminar el producto en el servidor');
        }
      })
      .then(() => {
        // Elimina el producto localmente solo si la eliminación en el servidor fue exitosa
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };

  const handlePageChange = (newPage) => {
    if (newPage < 1) {
      setCurrentPage(totalPages);
    } else if (newPage > totalPages) {
      setCurrentPage(1);
    } else {
      setCurrentPage(newPage);
    }
    
  };

  return (
    <div>
      <div className="flex justify-around my-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-slate-600 hover:bg-slate-900 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-xl"
        >
          Anterior
        </button>
        <span className="text-gray-500  font-bold py-2 px-4">
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-slate-600 hover:bg-slate-900 text-gray-800 hover:text-white font-bold py-2 px-4 rounded-xl"
        >
          Siguiente
        </button>
      </div>
      <div className="grid text-center grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-slate-900 text-black py-6 mb-2 px-0 rounded-xl transform hover:scale-110 mx-2 shadow-5">
            
            <div id='listaProducto' className="mx-2 ">
            <Link href={`/pages/product/${product.id}`}>            <a>
              <img
                src={product.fotografia}
                alt={`Imagen de ${product.fotografia}`}
                className="max-h-48 rounded-xl object-contain mx-auto mb-4"
              />
              <div className="grid grid-cols-2 font-bold al gap-0">
                <p className="border-solid border-2 rounded-xl mr-2">{product.marca}</p>
                <p className="border-solid border-2 rounded-xl ml-2"> {product.modelo}</p>
              </div>
              <div className="grid grid-cols-4 font-bold gap-1">
                <p className="border-solid border-2 rounded-xl">{product.alto}</p>
                <p className="border-solid border-2 rounded-xl">{product.ancho}</p>
                <p className="border-solid border-2 rounded-xl">{product.peso}</p>
                <p className="border-solid border-2 rounded-xl">{product.profundidad}</p>
                <p className="border-solid border-2 rounded-xl">{product.color}</p>
                <p className="border-solid border-2 rounded-xl">{product.eficienciaEnergetica}</p>
                <p className="border-solid border-2 rounded-xl">{product.garantia}</p>
                <p className="border-solid border-2 rounded-xl">{product.voltaje}</p>
                
              </div>

              </a>
            </Link>
            </div>

            {editingProductId === product.id && (
              <div id='mostrarProducto' className="modal-container">
                <input
                  className="border rounded-2xl my-1 px-2"
                  type="text"
                  value={updatedProductData.fotografia}
                  onChange={(e) => handleInputChange(e, 'fotografia')}
                  placeholder='Url Imagen'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.marca}
                  onChange={(e) => handleInputChange(e, 'marca')}
                  placeholder='Marca'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.modelo}
                  onChange={(e) => handleInputChange(e, 'modelo')}
                  placeholder='Modelo'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.garantia}
                  onChange={(e) => handleInputChange(e, 'garantia')}
                  placeholder='Garantía'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.color}
                  onChange={(e) => handleInputChange(e, 'color')}
                  placeholder='Color'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.voltaje}
                  onChange={(e) => handleInputChange(e, 'voltaje')}
                  placeholder='Voltaje'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.alto}
                  onChange={(e) => handleInputChange(e, 'alto')}
                  placeholder='Alto'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.ancho}
                  onChange={(e) => handleInputChange(e, 'ancho')}
                  placeholder='Ancho'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.profundidad}
                  onChange={(e) => handleInputChange(e, 'profundidad')}
                  placeholder='Profundidad'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.eficienciaEnergetica}
                  onChange={(e) => handleInputChange(e, 'eficienciaEnergetica')}
                  placeholder='Eficiencia Energética'
                />
                <input
                  className="border rounded my-1 px-2"
                  type="text"
                  value={updatedProductData.peso}
                  onChange={(e) => handleInputChange(e, 'peso')}
                  placeholder='Peso'
                />
                <div className="flex items-center">
                  <button
                    className="bg-emerald-600 hover:bg-emerald-800 my-1 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleSave(product.id)}
                  >
                    Guardar
                  </button>
                  <button
                    className="bg-red-600 hover.bg-red-800 text-white px-2 py-1 rounded"
                    onClick={handleCancel}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="flex mt-2 justify-center">
              {editingProductId === product.id ? (
                null // Si está editando, no muestra los botones Editar y Eliminar en este punto
              ) : (
                <div className="flex items-center">
                  <button
                    className="bg-amber-600 hover:bg-amber-800 text-white px-2 py-1 rounded mr-2 "
                    onClick={() => handleEdit(product.id, product)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-red-600 hover:bg-red-800 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              )}
            </div>

            
          </div>
        ))}
      </div>
    </div>
  );
};
<style jsx>{`
  .modal-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }
`}</style>
export default ProductList;