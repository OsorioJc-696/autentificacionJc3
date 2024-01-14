// api/productos/[id].js
import { withAuth } from '../middleware';

const productos = [
  { id: '1', nombre: 'Producto 1' },
  { id: '2', nombre: 'Producto 2' },
  { id: '3', nombre: 'Producto 3' },
];

const handler = (req, res) => {
  const { id } = req.query;
  const producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: 'Producto no encontrado' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(producto);
  } else if (req.method === 'PATCH') {
    const actualizacion = req.body;
    Object.assign(producto, actualizacion);
    return res.status(200).json(producto);
  } else if (req.method === 'DELETE') {
    const index = productos.indexOf(producto);
    productos.splice(index, 1);
    return res.status(204).end();
  } else {
    return res.status(405).json({ error: 'Método no permitido' });
  }
};

export default withAuth(handler);
