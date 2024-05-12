import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/PanelDivisor";
import ClienteIcon from "../assets/ClienteIcon";
import ProductosIcon from "../assets/ProductosIcon";
import { CardGeneral } from "../components/CardGeneral";
import ProvedoresIcon from "../assets/ProveedoresIcon";
import CategoryList from "../components/CategoryList";
import FacturaIcon from "../assets/FacturaIcon";
import ExistenciaTotalIcon from "../assets/ExistenciaTotalIcon";
import ExistenciaVendidaIcon from "../assets/ExistenciaVendidaIcon";
import ExistenciaActualIcon from "../assets/ExistenciaActualIcon";
import ImporteVendidoIcon from "../assets/ImporteVendido";
import ImportePagadoIcon from "../assets/ImportePagado";
import ImporteRestanteIcon from "../assets/ImporteRestante";
import BeneficioBrutoIcon from "../assets/BeneficioBrutoIcon";
import BeneficioTotalIcon from "../assets/BeneficioTotalIcon";
import { ClientsBar } from "../components/ClientsBar";
import { VentasGraf } from "../components/VentasGraf";
import ProductosMasVendidosList from "../components/ProductosMasVendidosList";
import ProductosMenosVendidosList from "../components/ProductosMenosVendidos";
import BarChartGanancias from "../components/BarChart";

const fetchData = (url, setter) => {
  fetch(url)
    .then((response) => response.text())
    .then((data) => setter(parseInt(data)));
};

const Page = () => {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalProveedores, setTotalProveedores] = useState(0);
  const [totalCategorias, setTotalCategorias] = useState(0);
  const [totalProductos, setTotalProductos] = useState(0);
  const [totalFacturas, setTotalFacturas] = useState(0);
  const [existenciaTotal, setExistenciaTotal] = useState(0);
  const [existenciaVendida, setExistenciaVendida] = useState(0);
  const [existenciaActual, setExistenciaActual] = useState(0);
  const [totalImporteVendido, setTotalImporteVendido] = useState(0);
  const [totalImportePagado, setTotalImportePagado] = useState(0);
  const [totalBeneficioBruto, setTotalbeneficioBruto] = useState(0);
  const [totalBeneficioNeto, setTotalBeneficioNeto] = useState(0);

  const fetchItems = [
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaClientes",
      setter: setTotalClientes,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaProveedors",
      setter: setTotalProveedores,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaCategorias",
      setter: setTotalCategorias,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaProductos",
      setter: setTotalProductos,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaFacturas",
      setter: setTotalFacturas,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasTotales",
      setter: setExistenciaTotal,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasVendidas",
      setter: setExistenciaVendida,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasActuales",
      setter: setExistenciaActual,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaImporteVendido",
      setter: setTotalImporteVendido,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaImportePagado",
      setter: setTotalImportePagado,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaBeneficioBruto",
      setter: setTotalbeneficioBruto,
    },
    {
      url: "https://localhost:7073/inventario-service/Dashboard/TarjetaBeneficioNeto",
      setter: setTotalBeneficioNeto,
    },
  ];

  useEffect(() => {
    fetchItems.forEach(({ url, setter }) => fetchData(url, setter));
  }, []);

  return (
    <div
      className="shadow-md  shadow-black"
      style={{ maxHeight: "calc(100vh - 80px)", overflowY: "auto" }}
    >
      <section className="flex flex-wrap justify-evenly gap-4 p-4 ">
        <CardGeneral
          nombre={"Clientes"}
          cantidad={totalClientes}
          logo={<ClienteIcon clases={"size-16"} />}
          color={"bg-[#72bd79]"}
        />
        <CardGeneral
          nombre={"Proveedores"}
          cantidad={totalProveedores}
          logo={<ProvedoresIcon clases={"size-16"} />}
          color={"bg-[#78de78]"}
        />
        <CardGeneral
          nombre={"Categorias"}
          cantidad={totalCategorias}
          logo={<ImporteRestanteIcon clases={"size-16"} />}
          color={"bg-[#009e72]"}
        />
        <CardGeneral
          nombre={"Productos"}
          cantidad={totalProductos}
          logo={<ProductosIcon clases={"size-16"} />}
          color={"bg-[#03db50]"}
        />
        <CardGeneral
          nombre={"Facturas"}
          cantidad={totalFacturas}
          logo={<FacturaIcon clases={"size-16"} />}
          color={"bg-[#2c8028]"}
        />
        <CardGeneral
          nombre={"Existencia total"}
          cantidad={existenciaTotal}
          logo={<ExistenciaTotalIcon clases={"size-16"} />}
          color={"bg-[#61ba5e]"}
        />
        <CardGeneral
          nombre={"Existencia vendida"}
          cantidad={existenciaVendida}
          logo={<ExistenciaVendidaIcon clases={"size-16"} />}
          color={"bg-[#89cc86]"}
        />
        <CardGeneral
          nombre={"Existencia actual"}
          cantidad={existenciaActual}
          logo={<ExistenciaActualIcon clases={"size-16"} />}
          color={"bg-[#90c014]"}
        />
        <CardGeneral
          nombre={"Importe vendido"}
          cantidad={totalImporteVendido}
          logo={<ImporteVendidoIcon clases={"size-16"} />}
          color={"bg-[#b4ff9a]"}
        />
        <CardGeneral
          nombre={"Importe pagado"}
          cantidad={totalImportePagado}
          logo={<ImportePagadoIcon clases={"size-16"} />}
          color={"bg-[#5f800d]"}
        />

        <CardGeneral
          nombre={"Beneficio bruto"}
          cantidad={totalBeneficioBruto}
          logo={<BeneficioBrutoIcon clases={"size-16"} />}
          color={"bg-[#32a45e]"}
        />
        <CardGeneral
          nombre={"Beneficio neto"}
          cantidad={totalBeneficioNeto}
          logo={<BeneficioTotalIcon clases={"size-16"} />}
          color={"bg-[#71c55b]"}
        />

        {/* <CategoryList color={"bg-[#1f7e26]"} /> */}
        <ClientsBar color={"bg-[#4ea93b]"} />
        <VentasGraf color={"bg-[#4ea93b]"} />
        <ProductosMasVendidosList color={"bg-[#1f7e26]"} />
        <ProductosMenosVendidosList color={"bg-[#1f7e26]"} />
        {/* <VentasGraf color={"bg-[#4ea93b]"} /> */}
        <BarChartGanancias color={"bg-[#4ea93b]"} />
      </section>
    </div>
  );
};
const DashboardPage = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default DashboardPage;
