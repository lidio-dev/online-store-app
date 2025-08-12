import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { OrderService } from "../../services/orderService";

export default function OrdersIndex() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getAll()
      .then((data) => {
        const formatted = data.map((order) => ({
          id: order.order_id,
          date: order.order_date,
          customer: order.customer?.name || "Sin cliente",
          employee: order.employee?.name || "Sin empleado",
        }));

        setOrders(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar las órdenes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando órdenes...</p>;
  }

  return (
    <DataTable
      title="Registro de Órdenes de Compra"
      columns={["ID", "Fecha", "Cliente", "Empleado"]}
      data={orders}
      basePath="/orders"
    />
  );
}
