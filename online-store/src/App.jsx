import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import Menu from "./components/Menu";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Menu />
        <main className="p-6">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  );
}
