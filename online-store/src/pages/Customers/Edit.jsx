import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CustomerService } from "../../services/customerService";

export default function CustomerEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const data = await CustomerService.getById(id);
        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        });
      } catch (error) {
        console.error("Error al obtener cliente:", error);
        alert("No se pudo cargar el cliente.");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await CustomerService.update(id, form);
      navigate("/customers");
    } catch (error) {
      console.error("Error al actualizar cliente:", error);
      alert("No se pudo actualizar el cliente.");
    }
  };

  if (loading) {
    return <p className="text-center mt-6">Cargando datos...</p>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Cliente #{id}</h1>
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
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Teléfono"
        />
        <input
          type="text"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border px-3 py-2 rounded"
          placeholder="Dirección"
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
