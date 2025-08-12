import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { OrderDetailService } from "../../services/orderDetailService";

export default function OrderDetailsIndex() {
  const [orderDetails, setOrderDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderDetailService.getAll()
      .then((data) => {
        const formatted = data.map((detail) => ({
          id: detail.order_detail_id,
          order_date: detail.order?.order_date || "Sin fecha",
          product: detail.product?.name || "Sin producto",
          quantity: detail.quantity,
          unit_price: detail.unit_price,
        }));

        setOrderDetails(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar los detalles de pedido:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando detalles de pedido...</p>;
  }

  return (
    <DataTable
      title="Registro de Detalles de Pedido"
      columns={["ID", "Fecha", "Producto", "Cantidad", "Precio Unitario"]}
      data={orderDetails}
      basePath="/order-details"
    />
  );
}
