import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-950 text-white px-8 py-4 flex flex-row items-center justify-between">
      {/* Izquierda: Logo y Nombre de la tienda */}
      <div className="flex items-center space-x-4">
        <img src="/F25sf.png" alt="Logo" className="h-24 w-24 text-white" />
        <h1 className="text-2xl font-bold">ELECROMART</h1>
      </div>

      {/* Centro: Barra de búsqueda */}
      <div className="flex-grow md:flex md:justify-center items-center space-x-4">
        {/* Barra de búsqueda */}
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Buscar productos"
            className="bg-gray-800 text-white px-6 py-3 rounded-md"
          />
          <button className="bg-blue-500 text-white px-6 py-3 rounded-md">
            Buscar
          </button>
        </div>
      </div>

      {/* Derecha: Carrito, Home, Productos Populares y Catálogo, Iniciar sesión y Registrarse */}
      <div className="flex items-center space-x-4">
        {/* Icono de carrito de compra de Tailwind */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-8 w-8 cursor-pointer"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 6l-2-2M9 6l-2-2m-3 5l-1 4h12l-1-4M5 6h14"
          />
        </svg>

        {/* Enlace de "Home" */}
        <Link href="/">
          <span className="text-lg">Home</span>
        </Link>

        {/* Enlaces de Productos Populares y Catálogo a la derecha del carrito */}
        <div className="hidden md:flex space-x-4 text-lg">
          <Link href="/productos-populares">Productos Populares</Link>
          <Link href="/catalogo">Catálogo</Link>
        </div>

        {/* Renderizado condicional de autenticación */}
        {!session?.user ? (
          <>
            <Link href="/auth/login" className="text-lg">Iniciar sesión</Link>
            <Link href="/auth/register" className="text-lg">Registrarse</Link>
          </>
        ) : (
          <>
            <Link href="/dashboard" className="text-lg">Tablero</Link>
            <Link href="/api/auth/signout" className="text-lg">Cerrar sesión</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;