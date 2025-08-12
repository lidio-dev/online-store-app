import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderDetailService } from "../../services/orderDetailService";
import { OrderService } from "../../services/orderService";
import { ProductService } from "../../services/productService";

export default function OrdersDetailsCreate() {
  const [form, setForm] = useState({
    order_id: "",
    product_id: "",
    quantity: "",
    unit_price: "",
  });
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orderData = await OrderService.getAll();
        const productsData = await ProductService.getAll();
        setOrders(orderData);
        setProducts(productsData);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await OrderDetailService.create(form);
      navigate("/order-details");
    } catch (error) {
      console.error("Error al crear el detalle de la orden:", error);
      alert("No se pudo crear el detalle. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nuevo detalle de compra</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          value={form.order_id}
          onChange={(e) => setForm({ ...form, order_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione la orden</option>
          {orders.map((c) => (
            <option key={c.order_id} value={c.order_id}>
              {c.order_date}
            </option>
          ))}
        </select>

        <select
          value={form.product_id}
          onChange={(e) => setForm({ ...form, product_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione el producto</option>
          {products.map((e) => (
            <option key={e.product_id} value={e.product_id}>
              {e.name}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Cantidad"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Precio unitario"
          value={form.unit_price}
          onChange={(e) => setForm({ ...form, unit_price: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
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
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </form>
    </div>
  );
}
