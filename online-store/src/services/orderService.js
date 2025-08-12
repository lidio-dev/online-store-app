import { apiRequest } from "./apiRequest";

export const OrderService = {
  getAll: () => apiRequest("orders"),
  getById: (id) => apiRequest(`orders/${id}`),
  create: (order) => apiRequest("orders", "POST", order),
  update: (id, order) => apiRequest(`orders/${id}`, "PUT", order),
  delete: (id) => apiRequest(`orders/${id}`, "DELETE"),
  createWithDetails: (order) => apiRequest("orders-with-details", "POST", order),
};
