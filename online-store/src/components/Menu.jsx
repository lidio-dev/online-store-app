import { useState } from "react";
import { Link } from "react-router-dom";

export default function Menu() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menuName) => {
    setOpenMenu(openMenu === menuName ? null : menuName);
  };

  const closeMenu = () => {
    setOpenMenu(null);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="text-lg font-bold">
            <Link to="/" className="hover:text-blue-400 transition">
              Online Store
            </Link>
          </div>

          <ul className="flex space-x-8 relative">
            <li className="relative">
              <button
                onClick={() => toggleMenu("catalogos")}
                className="hover:text-blue-400 transition"
              >
                Catálogos
              </button>
              {openMenu === "catalogos" && (
                <ul className="absolute bg-gray-800 text-white mt-2 rounded shadow-lg min-w-[200px] z-50">
                  <li>
                    <Link
                      to="/products"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Gestión de productos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/categories"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Gestión de categorías
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/customers"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Gestión de clientes
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/employees"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Gestión de empleados
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            <li className="relative">
              <button
                onClick={() => toggleMenu("operacion")}
                className="hover:text-blue-400 transition"
              >
                Módulos de Operación
              </button>
              {openMenu === "operacion" && (
                <ul className="absolute bg-gray-800 text-white mt-2 rounded shadow-lg min-w-[200px] z-50">
                  <li>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Registro de órdenes de compra
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/order-details"
                      className="block px-4 py-2 hover:bg-gray-700"
                      onClick={closeMenu}
                    >
                      Registro de detalles de cada pedido
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
