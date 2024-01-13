import React, { useState }  from 'react';

const NewProductForm = ({setProducts}) => {
  const [addingProduct, setAddingProduct] = useState(false);
  const [newProductData, setNewProductData] = useState({
    id: '',
    alto: '',
    color: '',
    eficienciaEnergetica: '',
    fotografia: '',
    garantia: '',
    marca: '',
    modelo: '',
    peso: '',
    profundidad: '',
    voltaje: '',
  });
  
  
  const handleSaveNewProduct = () => {
    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductData),
    })
    .then(response => {
      if (response.ok) {
        console.log('Nuevo producto agregado con éxito');
        return response.json();
      } else {
        throw new Error('Error al agregar el nuevo producto');
      }
    })
    .then(newProduct => {
      setProducts(prevProducts => [...prevProducts, newProduct]);
      setAddingProduct(false);
      setNewProductData({
        id: '',
        alto: '',
        ancho: '',
        color: '',
        voltaje: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        profundidad: '',
        eficienciaEnergetica: '',
        peso: '',
      });
    })
    .catch(error => {
      console.error('Error al agregar el nuevo producto:', error);
    });
  };

  const handleCancelProduct = () => {
    setAddingProduct(false);
    setNewProductData({
      id: '',
        alto: '',
        ancho: '',
        color: '',
        voltaje: '',
        fotografia: '',
        garantia: '',
        marca: '',
        modelo: '',
        profundidad: '',
        eficienciaEnergetica: '',
        peso: '',
    });
  };
  const handleAddProduct = () => {
    setAddingProduct(true);
  };

  const handleInputChangeProduct = (e, field) => {
    const value = e.target.value;
    setNewProductData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  
  return (
    <div className="my-5">
      {addingProduct ? (
        <div className='mx-auto flex justify-center flex-col mx-20'>
          <div className="bg-white grid  gap-4 rounded p-4">
            
            <div className="rounded shadow grid sm:grid-cols-1 md:grid-cols-3  gap-4 ">
            <div className=" text-center grid grid-cols-2 md:grid-cols-1 lg:grid-cols-1 gap-4">
            <input
                type="text"
                value={newProductData.marca || ''}
                onChange={(e) => handleInputChangeProduct(e, 'marca')}
                className="border text-center hover:bg-cyan-900 bg-cyan-800 p-2 mb-2 rounded-2xl"
                placeholder="Marca"
                />
            <input
                type="text"
                value={newProductData.modelo || ''}
                onChange={(e) => handleInputChangeProduct(e, 'modelo')}
                className="border bg-cyan-800 hover:bg-cyan-900 p-2 mb-2 rounded-2xl text-center"
                placeholder="Modelo"
                />
            
                
                </div>

                <div className="text-center grid  grid-cols-4 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <input
                type="text"
                value={newProductData.alto || ''}
                onChange={(e) => handleInputChangeProduct(e, 'alto')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Alto"
                />
               <input
                type="text"
                value={newProductData.ancho || ''}
                onChange={(e) => handleInputChangeProduct(e, 'ancho')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Ancho"
                />
                <input
                type="text"
                value={newProductData.peso || ''}
                onChange={(e) => handleInputChangeProduct(e, 'peso')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Peso"
                />
            <input
                type="text"
                value={newProductData.profundidad || ''}
                onChange={(e) => handleInputChangeProduct(e, 'profundidad')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Profundidad"
                />
              </div>

                <div className="text-center grid grid-cols-4 md:grid-cols-1 lg:grid-cols-1 gap-4">
                <input
                type="text"
                value={newProductData.color || ''}
                onChange={(e) => handleInputChangeProduct(e, 'color')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Color"
                />
                <input
                    type="text"
                    value={newProductData.eficienciaEnergetica}
                    onChange={(e) => handleInputChangeProduct(e, 'eficienciaEnergetica')}
                    className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                    placeholder="Eficiencia Energetica"
                  />


                <input
                type="text"
                value={newProductData.garantia || ''}
                onChange={(e) => handleInputChangeProduct(e, 'garantia')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Garantia"
                />
                
            <input
                type="text"
                value={newProductData.voltaje || ''}
                onChange={(e) => handleInputChangeProduct(e, 'voltaje')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="Voltaje"
                />
            </div>
            </div>

            <input
                type="text"
                value={newProductData.fotografia || ''}
                onChange={(e) => handleInputChangeProduct(e, 'fotografia')}
                className="border bg-cyan-800 p-2 mb-2 rounded-2xl text-center hover:bg-cyan-900"
                placeholder="URL Imagen"
            />
            
          </div>
          <div className="flex mt-2 justify-center">
              <button className="bg-teal-500 hover:bg-teal-700 text-white m-2  px-4 py-3 rounded-xl mr-10" onClick={handleSaveNewProduct}>
                Guardar
              </button>
              <button className="bg-pink-500 hover:bg-pink-700 text-white m-2 px-4 py-3 rounded-xl ml-10" onClick={handleCancelProduct}>
                Cancelar
              </button>
            </div>
        </div>
      ) : (
        <div className="text-center">
          <button className="bg-sky-700 hover:bg-sky-900 text-white px-4 py-2 rounded-md " onClick={handleAddProduct}>
            Agregar Nuevo Producto
          </button>
        </div>
      )}
    </div>
  );
};

export default NewProductForm;
