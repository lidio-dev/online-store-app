import { useNavigate, useParams, Link } from "react-router-dom";
import { CustomerService } from "../../services/customerService";

export default function CustomerDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar el cliente #${id}?`)) {
      return;
    }

    try {
      await CustomerService.delete(id);
      navigate("/customers");
    } catch (error) {
      console.error("Error al eliminar el cliente:", error);
      alert("No se pudo eliminar el cliente.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Eliminar Cliente</h1>
      <p>¿Estás seguro de que quieres eliminar el cliente #{id}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
        <Link
          to="/customers"
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
