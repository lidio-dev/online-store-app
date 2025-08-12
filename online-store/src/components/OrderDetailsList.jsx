import { Link } from "react-router-dom";

export default function OrderDetailsList({ details }) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-md font-bold">Detalles del Pedido</h2>
        <Link
          to={`/order-details/create`}
          className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
        >
          Agregar Detalle
        </Link>
      </div>

      {(!details || details.length === 0) ? (
        <p className="text-gray-500">No hay detalles registrados.</p>
      ) : (
        <table className="min-w-full bg-white border rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">ID Detalle</th>
              <th className="border px-4 py-2 text-left">Fecha Orden</th>
              <th className="border px-4 py-2 text-left">Producto</th>
              <th className="border px-4 py-2 text-left">Cantidad</th>
              <th className="border px-4 py-2 text-left">Precio Unitario</th>
              <th className="border px-4 py-2 text-left">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{detail.order_detail_id}</td>
                <td className="border px-4 py-2">{detail.order_date}</td>
                <td className="border px-4 py-2">{detail.product_name}</td>
                <td className="border px-4 py-2">{detail.quantity}</td>
                <td className="border px-4 py-2">
                  ${detail.unit_price}
                </td>
                <td className="border px-4 py-2">
                  ${(detail.quantity * detail.unit_price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
