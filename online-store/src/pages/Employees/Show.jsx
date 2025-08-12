import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeService } from "../../services/employeeService";

export default function EmployeeShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const data = await EmployeeService.getById(id);
        setEmployee(data);
      } catch (error) {
        console.error("Error al obtener empleado:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!employee) {
    return <p className="text-center mt-6">Empleado no encontrado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del Empleado</h1>
      <p><strong>ID:</strong> {employee.employee_id}</p>
      <p><strong>Nombre:</strong> {employee.name}</p>
      <p><strong>Correo:</strong> {employee.email}</p>
      <p><strong>Puesto:</strong> {employee.position}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Regresar
      </button>
    </div>
  );
}
