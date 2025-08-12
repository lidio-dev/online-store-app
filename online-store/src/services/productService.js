import { apiRequest } from "./apiRequest";

export const ProductService = {
  getAll: () => apiRequest("products"),
  getById: (id) => apiRequest(`products/${id}`),
  create: (product) => apiRequest("products", "POST", product),
  update: (id, product) => apiRequest(`products/${id}`, "PUT", product),
  delete: (id) => apiRequest(`products/${id}`, "DELETE"),
};
