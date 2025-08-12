import { apiRequest } from "./apiRequest";

export const CategoryService = {
  getAll: () => apiRequest("categories"),
  getById: (id) => apiRequest(`categories/${id}`),
  create: (category) => apiRequest("categories", "POST", category),
  update: (id, category) => apiRequest(`categories/${id}`, "PUT", category),
  delete: (id) => apiRequest(`categories/${id}`, "DELETE"),
};
