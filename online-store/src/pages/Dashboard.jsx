import { useState, useEffect } from "react";
import { OrderService } from "../services/orderService";
import { ProductService } from "../services/productService";
import { CustomerService } from "../services/customerService";
import { EmployeeService } from "../services/employeeService";
import OrderForm from "../components/OrderForm";
import OrdersList from "../components/OrderList";

export default function OrdersMain() {
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [orders, setOrders] = useState([]);
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(items.reduce((acc, item) => acc + item.quantity * item.price, 0));
  }, [items]);

  useEffect(() => {
    ProductService.getAll().then((data) => setProducts(data || []));
    CustomerService.getAll().then((data) => setCustomers(data || []));
    EmployeeService.getAll().then((data) => setEmployees(data || []));
    OrderService.getAll().then((data) => setOrders(data || []));
  }, []);

  const addItem = (productId, quantity) => {
    const product = products.find((p) => p.product_id === Number(productId));
    if (!product) return;
    if (quantity > product.stock) {
      alert(`Stock insuficiente: disponible ${product.stock}`);
      return;
    }
    setItems([...items, { ...product, quantity }]);
  };

  const saveOrder = async (customerId, employeeId, orderDate) => {
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
        unit_price: item.price,
      })),
    };

    try {
      await OrderService.createWithDetails(payload);
      const updatedOrders = await OrderService.getAll();
      setOrders(updatedOrders || []);
      cancelOrder();
    } catch (err) {
      console.error("Error guardando orden:", err);
      alert("No se pudo guardar la orden.");
    }
  };

  const cancelOrder = () => {
    setItems([]);
    setTotal(0);
  };

  return (
    <div className="p-6 space-y-6">
      <OrderForm
        products={products}
        customers={customers}
        employees={employees}
        addItem={addItem}
        saveOrder={saveOrder}
        cancelOrder={cancelOrder}
        items={items}
        total={total}
      />
      <OrdersList orders={orders} />
    </div>
  );
}
