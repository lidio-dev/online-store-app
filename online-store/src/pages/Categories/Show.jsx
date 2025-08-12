import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CategoryService } from "../../services/categoryService";

export default function CategorieShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await CategoryService.getById(id);
        setCategory(data);
      } catch (error) {
        console.error("Error al cargar la categoría:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!category) {
    return <p className="text-center mt-6">Categoría no encontrado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles de la Categoría</h1>
      <p>
        <strong>ID:</strong> {category.category_id}
      </p>
      <p>
        <strong>Nombre:</strong> {category.name}
      </p>
      <p>
        <strong>Descripción:</strong> {category.description}
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
