import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { ProductService } from "../../services/productService";
import { CategoryService } from "../../services/categoryService";

export default function ProductsIndex() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([ProductService.getAll(), CategoryService.getAll()])
      .then(([productsData, categoriesData]) => {
        const categoriesMap = categoriesData.reduce((acc, cat) => {
          acc[cat.category_id] = cat.name;
          return acc;
        }, {});

        const formatted = productsData.map((prod) => ({
          id: prod.product_id,
          name: prod.name,
          price: prod.price ? `$${prod.price}` : "",
          stock: prod.stock ?? "",
          category: categoriesMap[prod.category_id] || "Sin categoría",
        }));

        setProducts(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar los productos o categorías:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando productos...</p>;
  }

  return (
    <DataTable
      title="Gestión de Productos"
      columns={["ID", "Nombre", "Precio", "Stock", "Categoría"]}
      data={products}
      basePath="/products"
    />
  );
}
