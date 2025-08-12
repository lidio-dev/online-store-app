import { useState } from "react";
import { Link } from "react-router-dom";

export default function DataTable({ title, columns, data, basePath }) {
  const [search, setSearch] = useState("");

  const filteredData = data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="p-6">
      {/* Encabezado y botón crear */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">{title}</h1>
        <Link
          to={`${basePath}/create`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Crear
        </Link>
      </div>

      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-xs"
        />
      </div>

      {/* Tabla */}
      <table className="min-w-full bg-white border border-gray-300 shadow">
        <thead>
          <tr className="bg-gray-100 border-b">
            {columns.map((col, i) => (
              <th key={i} className="p-2 border-r">{col}</th>
            ))}
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row) => (
            <tr key={row.id} className="border-b hover:bg-gray-50">
              {Object.values(row).map((val, i) => (
                <td key={i} className="p-2 border-r">{val}</td>
              ))}
              <td className="p-2 flex space-x-2">
                <Link
                  to={`${basePath}/${row.id}`}
                  className="text-blue-600 hover:underline"
                >
                  Ver
                </Link>
                <Link
                  to={`${basePath}/${row.id}/edit`}
                  className="text-green-600 hover:underline"
                >
                  Editar
                </Link>
                <Link
                  to={`${basePath}/${row.id}/delete`}
                  className="text-red-600 hover:underline"
                >
                  Eliminar
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
