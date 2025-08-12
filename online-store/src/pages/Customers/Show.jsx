import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CustomerService } from "../../services/customerService";

export default function CustomerShow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await CustomerService.getById(id);
        setCustomer(data);
      } catch (error) {
        console.error("Error al obtener cliente:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  if (!customer) {
    return <p className="text-center mt-6">Cliente no encontrado</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Detalles del cliente</h1>
      <p><strong>ID:</strong> {customer.customer_id}</p>
      <p><strong>Nombre:</strong> {customer.name}</p>
      <p><strong>Correo:</strong> {customer.email}</p>
      <p><strong>Teléfono:</strong> {customer.phone}</p>
      <p><strong>Dirección:</strong> {customer.address}</p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
      >
        Regresar
      </button>
    </div>
  );
}
