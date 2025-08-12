import { apiRequest } from "./apiRequest";

export const CustomerService = {
  getAll: () => apiRequest("customers"),
  getById: (id) => apiRequest(`customers/${id}`),
  create: (customer) => apiRequest("customers", "POST", customer),
  update: (id, customer) => apiRequest(`customers/${id}`, "PUT", customer),
  delete: (id) => apiRequest(`customers/${id}`, "DELETE"),
};
