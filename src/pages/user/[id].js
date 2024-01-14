// src/pages/product/[productId].jsx
import React from 'react';
import { useRouter } from 'next/router';

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;

  // Lógica para cargar y mostrar los detalles del producto con el productId

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <p>Producto ID: {productId}</p>
      {/* Agrega más detalles según sea necesario */}
    </div>
  );
};

export default ProductDetail;
