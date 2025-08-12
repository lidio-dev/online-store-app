import { useState, useEffect } from "react";
import { OrderService } from "../services/orderService";
import { ProductService } from "../services/productService";
import { CustomerService } from "../services/customerService";
import { EmployeeService } from "../services/employeeService";


export default function OrdersMain() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customerId, setCustomerId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((acc, item) => acc + item.quantity * item.price, 0));
  }, [items]);

  // Cargar datos iniciales
  useEffect(() => {
    ProductService.getAll()
      .then((data) => setProducts(data || []))
      .catch((err) => console.error("Error cargando productos:", err));

    CustomerService.getAll()
      .then((data) => setCustomers(data || []))
      .catch((err) => console.error("Error cargando clientes:", err));

    EmployeeService.getAll()
      .then((data) => setEmployees(data || []))
      .catch((err) => console.error("Error cargando empleados:", err));

    OrderService.getAll()
      .then((data) => setOrders(data || []))
      .catch((err) => console.error("Error cargando órdenes:", err));
  }, []);

  const addItem = () => {
    const product = products.find(
      (p) => p.product_id === Number(selectedProduct)
    );
    if (!product) return;

    if (quantity > product.stock) {
      alert(`Stock insuficiente: disponible ${product.stock}`);
      return;
    }

    setItems([...items, { ...product, quantity }]);
    setQuantity(1);
    setSelectedProduct("");
  };

  const saveOrder = async (e) => {
    e.preventDefault();

    if (!customerId || !employeeId || !orderDate || items.length === 0) {
      alert("Completa todos los campos y agrega productos.");
      return;
    }

    const payload = {
      order_date: orderDate,
      customer_id: Number(customerId),
      employee_id: Number(employeeId),
      details: items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        unit_price: item.price
      })),
    };

    try {
      await OrderService.createWithDetails(payload);
      const updatedOrders = await OrderService.getAll();
      setOrders(updatedOrders || []);
      cancelOrder(); // limpiar después de guardar
    } catch (err) {
      console.error("Error guardando orden:", err);
      alert("No se pudo guardar la orden. Revisa la consola.");
    }
  };

  const cancelOrder = () => {
    setCustomerId("");
    setEmployeeId("");
    setOrderDate("");
    setSelectedProduct("");
    setQuantity(1);
    setItems([]);
    setTotal(0);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Formulario */}
      <form onSubmit={saveOrder} className="border p-4 rounded shadow space-y-4">
        <h2 className="text-xl font-bold">Registrar Orden</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Select Cliente */}
          <select
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Seleccionar Cliente</option>
            {(customers || []).map((c) => (
              <option key={c.customer_id} value={c.customer_id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Select Empleado */}
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Seleccionar Empleado</option>
            {(employees || []).map((e) => (
              <option key={e.employee_id} value={e.employee_id}>
                {e.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={orderDate}
            onChange={(e) => setOrderDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        {/* Productos */}
        <div className="flex gap-2 items-end">
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
            className="border p-2 rounded flex-1"
          >
            <option value="">Seleccionar producto...</option>
            {(products || []).map((p) => (
              <option key={p.product_id} value={p.product_id}>
                {p.name} - Stock: {p.stock} - ${p.price}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-20"
          />
          <button
            type="button"
            onClick={addItem}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Agregar
          </button>
        </div>

        {/* Lista de productos */}
        {items.length > 0 && (
          <table className="w-full border mt-4">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-2 py-1">Producto</th>
                <th className="border px-2 py-1">Cantidad</th>
                <th className="border px-2 py-1">Precio</th>
                <th className="border px-2 py-1">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{item.name}</td>
                  <td className="border px-2 py-1">{item.quantity}</td>
                  <td className="border px-2 py-1">${item.price}</td>
                  <td className="border px-2 py-1">
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <p className="text-right font-bold">Total: ${total.toFixed(2)}</p>

        {/* Botones */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Guardar Orden
          </button>
          <button
            type="button"
            onClick={cancelOrder}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      </form>

      {/* Lista de órdenes */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Órdenes Registradas</h2>
        {(orders || []).length === 0 ? (
          <p className="text-gray-500">No hay órdenes registradas.</p>
        ) : (
          (orders || []).map((order) => (
            <div key={order.order_id} className="border p-2 mb-2 rounded">
              <p><strong>Cliente:</strong> {order.customer?.name}</p>
              <p><strong>Empleado:</strong> {order.employee?.name}</p>
              <p><strong>Fecha:</strong> {order.order_date}</p>
              <ul className="list-disc list-inside">
                {(order.orderDetails || []).map((item, i) => (
                  <li key={i}>
                    {item.product?.name} - {item.quantity} x ${item.unit_price}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
