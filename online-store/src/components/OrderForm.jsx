import { useState, useEffect } from "react";

export default function OrderForm({
  products,
  customers,
  employees,
  addItem,
  saveOrder,
  cancelOrder,
  items,
  total
}) {
  const [customerId, setCustomerId] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [orderDate, setOrderDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleAddItem = () => {
    addItem(selectedProduct, quantity);
    setQuantity(1);
    setSelectedProduct("");
  };

  const handleSave = (e) => {
    e.preventDefault();
    saveOrder(customerId, employeeId, orderDate);
  };

  return (
    <form onSubmit={handleSave} className="border p-4 rounded shadow space-y-4">
      <h2 className="text-xl font-bold">Registrar Orden</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar Cliente</option>
          {customers.map((c) => (
            <option key={c.customer_id} value={c.customer_id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          className="border p-2 rounded w-full"
        >
          <option value="">Seleccionar Empleado</option>
          {employees.map((e) => (
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

      <div className="flex gap-2 items-end">
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="border p-2 rounded flex-1"
        >
          <option value="">Seleccionar producto...</option>
          {products.map((p) => (
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
          onClick={handleAddItem}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar
        </button>
      </div>

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
  );
}
