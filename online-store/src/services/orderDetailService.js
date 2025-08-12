import { apiRequest } from "./apiRequest";

export const OrderDetailService = {
  getAll: () => apiRequest("order-details"),
  getById: (id) => apiRequest(`order-details/${id}`),
  create: (orderDetail) => apiRequest("order-details", "POST", orderDetail),
  update: (id, orderDetail) =>
    apiRequest(`order-details/${id}`, "PUT", orderDetail),
  delete: (id) => apiRequest(`order-details/${id}`, "DELETE"),
};
