import React from "react";
import PanelDivisor from "../components/PanelDivisor";
const Page = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-between p-10 ">
      <button className="btn__reportes">Listado de Clientes</button>
      <button className="btn__reportes">Listado de Productos</button>
      <button className="btn__reportes">Listado de Proveedores</button>
      <button className="btn__reportes">Ventas por Periodos</button>
      <button className="btn__reportes">Compras por Periodos</button>
    </div>
  );
};

const PageReportes = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default PageReportes;
