import { apiRequest } from "./apiRequest";

export const EmployeeService = {
  getAll: () => apiRequest("employees"),
  getById: (id) => apiRequest(`employees/${id}`),
  create: (employee) => apiRequest("employees", "POST", employee),
  update: (id, employee) => apiRequest(`employees/${id}`, "PUT", employee),
  delete: (id) => apiRequest(`employees/${id}`, "DELETE"),
};
