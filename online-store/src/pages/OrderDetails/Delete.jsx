import { useNavigate, useParams, Link } from "react-router-dom";
import { OrderDetailService } from "../../services/orderDetailService";

export default function OrderDetailsDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar el detalle de pedido #${id}?`)) {
      return;
    }

    try {
      await OrderDetailService.delete(id);
      navigate("/order-details");
    } catch (error) {
      console.error("Error al eliminar el detalle de pedido:", error);
      alert("No se pudo eliminar el detalle de pedido.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Eliminar Detalle de Pedido</h1>
      <p>¿Estás seguro de que quieres eliminar el detalle de pedido #{id}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
        <Link
          to="/order-details"
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
