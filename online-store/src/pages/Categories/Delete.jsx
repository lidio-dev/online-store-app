import { useNavigate, useParams, Link } from "react-router-dom";
import { CategoryService } from "../../services/categoryService";

export default function CategorieDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm(`¿Seguro que deseas eliminar la Categoría #${id}?`)) {
      return;
    }

    try {
      await CategoryService.delete(id);
      navigate("/categories");
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
      alert("No se pudo eliminar la categoría.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto text-center">
      <h1 className="text-2xl font-bold mb-4">Eliminar Categoría</h1>
      <p>¿Estás seguro de que quieres eliminar la Categoría #{id}?</p>
      <div className="mt-4 space-x-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
        <Link
          to="/categories"
          className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
        >
          Cancelar
        </Link>
      </div>
    </div>
  );
}
