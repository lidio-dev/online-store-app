import { Routes, Route } from "react-router-dom";
import DashboardPage from "../pages/Dashboard";

import ProductsIndex from "../pages/Products/Index";
import ProductCreate from "../pages/Products/Create";
import ProductShow from "../pages/Products/Show";
import ProductEdit from "../pages/Products/Edit";
import ProductDelete from "../pages/Products/Delete";

import CategoryIndex from "../pages/Categories/Index";
import CategoryCreate from "../pages/Categories/Create";
import CategoryShow from "../pages/Categories/Show";
import CategoryEdit from "../pages/Categories/Edit";
import CategoryDelete from "../pages/Categories/Delete";

import CustomersIndex from "../pages/Customers/Index";
import CustomerCreate from "../pages/Customers/Create";
import CustomerDelete from "../pages/Customers/Delete";
import CustomerEdit from "../pages/Customers/Edit";
import CustomerShow from "../pages/Customers/Show";

import EmployeeIndex from "../pages/Employees/Index";
import EmployeeCreate from "../pages/Employees/Create";
import EmployeeShow from "../pages/Employees/Show";
import EmployeeEdit from "../pages/Employees/Edit";
import EmployeeDelete from "../pages/Employees/Delete";

import OrdersIndex from "../pages/Orders/Index";
import OrderCreate from "../pages/Orders/Create";
import OrderEdit from "../pages/Orders/Edit";
import OrderDelete from "../pages/Orders/Delete";
import OrderShow from "../pages/Orders/Show";

import OrderDetailsIndex from "../pages/OrderDetails/Index";
import OrderDetailsCreate from "../pages/OrderDetails/Create";
import OrderDetailsDelete from "../pages/OrderDetails/Delete";
import OrderDetailsEdit from "../pages/OrderDetails/Edit";
import OrderDetailsShow from "../pages/OrderDetails/Show";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />

      <Route path="/products" element={<ProductsIndex />} />
      <Route path="/products/create" element={<ProductCreate />} />
      <Route path="/products/:id" element={<ProductShow />} />
      <Route path="/products/:id/edit" element={<ProductEdit />} />
      <Route path="/products/:id/delete" element={<ProductDelete />} />

      <Route path="/categories" element={<CategoryIndex />} />
      <Route path="/categories/create" element={<CategoryCreate />} />
      <Route path="/categories/:id" element={<CategoryShow />} />
      <Route path="/categories/:id/edit" element={<CategoryEdit />} />
      <Route path="/categories/:id/delete" element={<CategoryDelete />} />

      <Route path="/customers" element={<CustomersIndex />} />
      <Route path="/customers/create" element={<CustomerCreate />} />
      <Route path="/customers/:id/delete" element={<CustomerDelete />} />
      <Route path="/customers/:id/edit" element={<CustomerEdit />} />
      <Route path="/customers/:id" element={<CustomerShow />} />

      <Route path="/employees" element={<EmployeeIndex />} /> 
      <Route path="/employees/create" element={<EmployeeCreate />} />
      <Route path="/employees/:id/delete" element={<EmployeeDelete />} />
      <Route path="/employees/:id/edit" element={<EmployeeEdit />} />
      <Route path="/employees/:id" element={<EmployeeShow />} />

      <Route path="/orders" element={<OrdersIndex />} />
      <Route path="/orders/create" element={<OrderCreate />} />
      <Route path="/orders/:id/edit" element={<OrderEdit />} />
      <Route path="/orders/:id/delete" element={<OrderDelete />} />
      <Route path="/orders/:id" element={<OrderShow />} />

      <Route path="/order-details" element={<OrderDetailsIndex />} />
      <Route path="/order-details/create" element={<OrderDetailsCreate />} />
      <Route path="/order-details/:id/edit" element={<OrderDetailsEdit />} />
      <Route path="/order-details/:id/delete" element={<OrderDetailsDelete />} />
      <Route path="/order-details/:id" element={<OrderDetailsShow />} />

    </Routes>
  );
}
