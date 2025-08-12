import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EmployeeService } from "../../services/employeeService";

export default function EmployeeEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", position: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getById(id);
        setForm({
          name: data.name || "",
          email: data.email || "",
          position: data.position || "",
        });
      } catch (error) {
        console.error("Error al obtener empleado:", error);
        alert("No se pudo cargar el empleado.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await EmployeeService.update(id, form);
      navigate("/employees");
    } catch (error) {
      console.error("Error al actualizar empleado:", error);
      alert("No se pudo actualizar el empleado.");
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Empleado #{id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Nombre"
          required
        />
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Correo"
          required
        />
        <input
          type="text"
          value={form.position}
          onChange={(e) => setForm({ ...form, position: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Posición"
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
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Actualizar
          </button>
        </div>
      </form>
    </div>
  );
}
