import { useNavigate, useParams, Link } from "react-router-dom";
import { ProductService } from "../../services/productService";

export default function ProductDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar el producto #${id}?`)) {
      return;
    }

    try {
      await ProductService.delete(id);
      navigate("/products");
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      alert("No se pudo eliminar el producto.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Eliminar Producto</h1>
      <p>¿Estás seguro de que quieres eliminar el producto #{id}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
        <Link
          to="/products"
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
