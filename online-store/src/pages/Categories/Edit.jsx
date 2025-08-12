import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CategoryService } from "../../services/categoryService";

export default function CategorieEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    CategoryService.getById(id)
      .then((data) => {
        setForm({
          name: data.name || "",
          description: data.description || "",
        });
      })
      .catch((error) => {
        console.error("Error al obtener la categoría:", error);
        alert("No se pudo cargar la categoría.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await CategoryService.update(id, form);
      navigate("/categories");
    } catch (error) {
      console.error("Error al actualizar la categoría:", error);
      alert("No se pudo actualizar la categoría.");
    }
  };

  if (loading) {
    return <p className="text-center p-6">Cargando categoría...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Categoría #{id}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Regresar
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
