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
import PageEntradas from "./pages/PageEntradas.jsx";
import PageSalidas from "./pages/PageSalidas.jsx";
import PagePerfil from "./pages/PagePerfil.jsx";
import PageReportes from "./pages/PageReportes.jsx";

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
    path: "/clientes",
    element: <PageClientes />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/gestion/productos",
    element: <PageProduct />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/gestion/categorias",
    element: <PageCategorias />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/gestion/proveedores",
    element: <PageProveedores />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/stock/entradas",
    element: <PageEntradas />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/stock/salidas",
    element: <PageSalidas />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/perfil",
    element: <PagePerfil />,
    errorElement: <PageNotFound />,
  },
  {
    path: "/reportes",
    element: <PageReportes />,
    errorElement: <PageNotFound />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
