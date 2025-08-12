import { useState, useEffect } from "react";
import DataTable from "../../components/DataTable";
import { CustomerService } from "../../services/customerService";

export default function CustomerIndex() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CustomerService.getAll()
      .then((data) => {
        const formatted = data.map((cat) => ({
          id: cat.customer_id,
          name: cat.name,
          email: cat.email || "",
          phone: cat.phone || "",
          address: cat.address || "",
        }));
        setCustomers(formatted);
      })
      .catch((error) => {
        console.error("Error al cargar los clientes:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Cargando clientes...</p>;
  }

  return (
    <DataTable
      title="Gestión de Clientes"
      columns={["ID", "Nombre", "Correo", "Teléfono", "Dirección"]}
      data={customers}
      basePath="/customers"
    />
  );
}
