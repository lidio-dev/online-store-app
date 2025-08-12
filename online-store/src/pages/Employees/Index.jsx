import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { EmployeeService } from "../../services/employeeService";

export default function EmployeeIndex() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    EmployeeService.getAll()
      .then((data) => {
        const formatted = data.map((emp) => ({
          id: emp.employee_id,
          name: emp.name,
          email: emp.email || "",
          position: emp.position || "",
        }));
        setEmployees(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar los empleados:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando empleados...</p>;
  }

  return (
    <DataTable
      title="Gestión de Empleados"
      columns={["ID", "Nombre", "Correo", "Puesto"]}
      data={employees}
      basePath="/employees"
    />
  );
}
