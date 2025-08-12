import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductService } from "../../services/productService";

export default function ProductShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await ProductService.getById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!product) {
    return <p className="text-center mt-6">Producto no encontrado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del Producto</h1>
      <p><strong>ID:</strong> {product.product_id}</p>
      <p><strong>Nombre:</strong> {product.name}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p>
        <strong>Categoría:</strong>{" "}
        {product.category?.name || "Sin categoría"}
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
