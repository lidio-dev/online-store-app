import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderService } from "../../services/orderService";

export default function OrderShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await OrderService.getById(id);
        setOrder(data);
      } catch (error) {
        console.error("Error al obtener la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!order) {
    return <p className="text-center mt-6">Orden no encontrada</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Orden</h1>
      <p><strong>ID:</strong> {order.order_id}</p>
      <p><strong>Fecha:</strong> {order.order_date}</p>
      <p>
        <strong>Cliente:</strong>{" "}
        {order.customer?.name || "Sin cliente"}
      </p>
      <p>
        <strong>Empleado:</strong>{" "}
        {order.employee?.name || "Sin empleado"}
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Regresar
      </button>
    </div>
  );
}
