import { useNavigate, useParams, Link } from "react-router-dom";
import { OrderService } from "../../services/orderService";

export default function OrderDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar la orden #${id}?`)) {
      return;
    }

    try {
      await OrderService.delete(id);
      navigate("/orders");
    } catch (error) {
      console.error("Error al eliminar la orden:", error);
      alert("No se pudo eliminar la orden.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Eliminar Orden</h1>
      <p>¿Estás seguro de que quieres eliminar la orden #{id}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
        <Link
          to="/orders"
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
