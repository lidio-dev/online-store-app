import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { OrderDetailService } from "../../services/orderDetailService";

export default function OrderDetailsShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [orderDetail, setOrderDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const data = await OrderDetailService.getById(id);
        setOrderDetail(data);
      } catch (error) {
        console.error("Error al obtener el detalle de la orden:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!orderDetail) {
    return <p className="text-center mt-6">Detalle de orden no encontrado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del Pedido</h1>
      <p><strong>ID Detalle:</strong> {orderDetail.order_detail_id}</p>
      <p><strong>ID Orden:</strong> {orderDetail.order_id}</p>
      <p><strong>Producto:</strong> {orderDetail.product?.name || "Sin producto"}</p>
      <p><strong>Cantidad:</strong> {orderDetail.quantity}</p>
      <p><strong>Precio Unitario:</strong> {orderDetail.unit_price}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Regresar
      </button>
    </div>
  );
}
