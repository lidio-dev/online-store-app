export default function OrdersList({ orders }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Órdenes Registradas</h2>
      {orders.length === 0 ? (
        <p className="text-gray-500">No hay órdenes registradas.</p>
      ) : (
        orders.map((order) => {
          const totalOrden = (order.order_details || []).reduce(
            (acc, item) => acc + item.quantity * item.unit_price,
            0
          );

          return (
            <div key={order.order_id} className="border p-2 mb-2 rounded">
              <p>
                <strong>Cliente:</strong> {order.customer?.name}
              </p>
              <p>
                <strong>Empleado:</strong> {order.employee?.name}
              </p>
              <p>
                <strong>Fecha:</strong> {order.order_date}
              </p>

              <ul className="list-disc list-inside">
                {(order.order_details || []).map((item, i) => (
                  <li key={i}>
                    {item.product?.name} - {item.quantity} x ${item.unit_price}
                  </li>
                ))}
              </ul>

              <p className="text-right font-bold mt-2">
                Total: ${totalOrden.toFixed(2)}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
}
