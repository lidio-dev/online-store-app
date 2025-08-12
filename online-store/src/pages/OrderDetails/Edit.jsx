import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderDetailService } from "../../services/orderDetailService";
import { OrderService } from "../../services/orderService";
import { ProductService } from "../../services/productService";

export default function OrderDetailsEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    order_id: "",
    product_id: "",
    quantity: "",
    unit_price: "",
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      OrderDetailService.getById(id),
      OrderService.getAll(),
      ProductService.getAll(),
    ])
      .then(([detailData, ordersData, productsData]) => {
        setForm({
          order_id: detailData.order_id || "",
          product_id: detailData.product_id || "",
          quantity: detailData.quantity || "",
          unit_price: detailData.unit_price || "",
        });
        setOrders(ordersData);
        setProducts(productsData);
      })
      .catch((error) => {
        console.error("Error al cargar datos del detalle de pedido:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderDetailService.update(id, form);
      navigate("/order-details");
    } catch (error) {
      console.error("Error al actualizar el detalle de pedido:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Cargando datos del detalle de pedido...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Editar Detalle de Pedido #{id}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección de Orden */}
        <select
          value={form.order_id}
          onChange={(e) => setForm({ ...form, order_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione orden</option>
          {orders.map((order) => (
            <option key={order.order_id} value={order.order_id}>
              {`#${order.order_id} - ${order.order_date}`}
            </option>
          ))}
        </select>

        {/* Selección de Producto */}
        <select
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione producto</option>
          {products.map((prod) => (
            <option key={prod.product_id} value={prod.product_id}>
              {prod.name}
            </option>
          ))}
        </select>

        {/* Cantidad */}
        <input
          type="number"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Cantidad"
        />

        {/* Precio Unitario */}
        <input
          type="number"
          step="0.01"
          value={form.unit_price}
          onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Precio unitario"
        />

        {/* Botones */}
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
