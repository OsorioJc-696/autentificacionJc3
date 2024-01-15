import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-gray-950 text-white px-8 py-4  grid grid-rows-2">
      {/* Izquierda: Logo y Nombre de la tienda */}
      <div className="flex items-center  justify-between">
        <img src="/F25sf.png" alt="Logo" className="h-24 w-24 text-white" />
        <h1 className="text-2xl font-bold">ELECROMART</h1>
        
        <div className="flex flex-col">
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

        {!session?.user ? (
          <>
            <Link href="/auth/login" className="text-lg">Iniciar sesión</Link>
            <Link href="/auth/register" className="text-lg">Registrarse</Link>
          </>
        ) : (
          <>
            
            <Link href="/api/auth/signout" className="text-lg">Cerrar sesión</Link>
          </>
        )}
        </div>
      </div>

      {/* Centro: Barra de búsqueda */}
      <div className="flex-grow md:flex md:justify-center items-center space-x-4">
      <div className="flex items-center space-x-4">

        <Link href="/"> <span className="text-lg">Home</span></Link>
        <Link href="/dashboard" className="text-lg">Catálogo</Link>
        <div className="hidden md:flex space-x-4 text-lg">
          <Link href="src/components/PopularProducts.jsx">Productos Populares</Link>
        </div>

      </div>

        <div className="flex bg-gray-800 ">
          <input
            type="text"
            placeholder="Buscar productos"
            className="   text-center  py-3 "
          />
          <button className="flex mx-auto  w-auto  px-6 py-3 rounded-xl">
          &#128270;
          </button>
        </div>

        

      </div>

    

    </nav>
  );
}

export default Navbar;