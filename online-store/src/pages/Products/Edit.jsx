import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProductService } from "../../services/productService";
import { CategoryService } from "../../services/categoryService";

export default function ProductEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Cargar producto y categorías
  useEffect(() => {
    Promise.all([ProductService.getById(id), CategoryService.getAll()])
      .then(([productData, categoriesData]) => {
        setForm({
          name: productData.name || "",
          price: productData.price || "",
          stock: productData.stock || "",
          category_id: productData.category_id || "",
        });
        setCategories(categoriesData);
      })
      .catch((error) => {
        console.error("Error al cargar producto o categorías:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await ProductService.update(id, form);
      navigate("/products");
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Cargando producto...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Producto #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Nombre"
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Precio"
        />
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Stock"
        />

        <select
          value={form.category_id}
          onChange={(e) => setForm({ ...form, category_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione categoría</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.name}
            </option>
          ))}
        </select>

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
