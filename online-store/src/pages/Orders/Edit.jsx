import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { OrderService } from "../../services/orderService";
import { CustomerService } from "../../services/customerService";
import { EmployeeService } from "../../services/employeeService";

export default function OrderEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({
    order_date: "",
    customer_id: "",
    employee_id: "",
  });
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([
      OrderService.getById(id),
      CustomerService.getAll(),
      EmployeeService.getAll(),
    ])
      .then(([orderData, customersData, employeesData]) => {
        setForm({
          order_date: orderData.order_date || "",
          customer_id: orderData.customer_id || "",
          employee_id: orderData.employee_id || "",
        });
        setCustomers(customersData);
        setEmployees(employeesData);
      })
      .catch((error) => {
        console.error("Error al cargar datos de la orden:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await OrderService.update(id, form);
      navigate("/orders");
    } catch (error) {
      console.error("Error al actualizar la orden:", error);
    }
  };

  if (loading) {
    return <p className="p-6">Cargando datos de la orden...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Orden #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          value={form.order_date}
          onChange={(e) => setForm({ ...form, order_date: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Fecha de la orden"
        />

        <select
          value={form.customer_id}
          onChange={(e) => setForm({ ...form, customer_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione cliente</option>
          {customers.map((cust) => (
            <option key={cust.customer_id} value={cust.customer_id}>
              {cust.name}
            </option>
          ))}
        </select>

        <select
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        >
          <option value="">Seleccione empleado</option>
          {employees.map((emp) => (
            <option key={emp.employee_id} value={emp.employee_id}>
              {emp.name}
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
