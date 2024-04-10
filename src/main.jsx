import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound.jsx";
import LogIn from "./pages/LogIn.jsx";
import PageProduct from "./pages/PageProduct.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import PageProveedores from "./pages/PageProveedores.jsx";
import PageCategorias from "./pages/PageCategorias.jsx";
import PageClientes from "./pages/PageClientes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LogIn />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/login",
    element: <LogIn />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/productos",
    path: "/stock/productos",
    element: <PageProduct />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/categorias",
    path: "/stock/categorias",
    element: <PageCategorias />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/proveedores",
    path: "/stock/proveedores",
    element: <PageProveedores />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/clientes",
    element: <PageClientes />,
    errorElement: <PageNotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
