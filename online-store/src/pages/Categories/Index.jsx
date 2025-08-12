import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { CategoryService } from "../../services/categoryService";

export default function CategorieIndex() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CategoryService.getAll()
      .then((data) => {
        const formatted = data.map((cat) => ({
          id: cat.category_id,
          name: cat.name,
          description: cat.description || "",
        }));
        setCategories(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar categorías:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando categorías...</p>;
  }

  return (
    <DataTable
      title="Gestión de Categorías"
      columns={["ID", "Nombre", "Descripción"]}
      data={categories}
      basePath="/categories"
    />
  );
}
