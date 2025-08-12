import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { OrderService } from "../../services/orderService";
import { CustomerService } from "../../services/customerService";
import { EmployeeService } from "../../services/employeeService";

export default function OrdersCreate() {
  const [form, setForm] = useState({
    order_date: "",
    customer_id: "",
    employee_id: "",
  });
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const customersData = await CustomerService.getAll();
        const employeesData = await EmployeeService.getAll();
        setCustomers(customersData);
        setEmployees(employeesData);
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
      await OrderService.create(form);
      navigate("/orders");
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("No se pudo crear la orden. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Nueva orden de compra</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={form.order_date}
          onChange={(e) => setForm({ ...form, order_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <select
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione un cliente</option>
          {customers.map((c) => (
            <option key={c.customer_id} value={c.customer_id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Seleccione un empleado</option>
          {employees.map((e) => (
            <option key={e.employee_id} value={e.employee_id}>
              {e.name}
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
