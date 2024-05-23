import React, { useState, useEffect } from "react";
import PanelDivisor from "../components/Pagina Principal/PanelDivisor";
import ClienteIcon from "../assets/ClienteIcon";
import ProductosIcon from "../assets/ProductosIcon";
import { CardGeneral } from "../components/Dashboard/CardGeneral";
import ProvedoresIcon from "../assets/ProveedoresIcon";
import FacturaIcon from "../assets/FacturaIcon";
import ExistenciaTotalIcon from "../assets/ExistenciaTotalIcon";
import ExistenciaVendidaIcon from "../assets/ExistenciaVendidaIcon";
import ExistenciaActualIcon from "../assets/ExistenciaActualIcon";
import ImporteVendidoIcon from "../assets/ImporteVendido";
import ImportePagadoIcon from "../assets/ImportePagado";
import ImporteRestanteIcon from "../assets/ImporteRestante";
import BeneficioBrutoIcon from "../assets/BeneficioBrutoIcon";
import BeneficioTotalIcon from "../assets/BeneficioTotalIcon";
import BarChartGanancias from "../components/Dashboard/BarChart";
import LineComprasVentas from "../components/Dashboard/LineChart";
import TopVendidos from "../components/Dashboard/DoughnutChart";
import UtilidadProductos from "../components/Dashboard/utilidadProduct";
import "../index.css";

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
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaClientes',
    //   setter: setTotalClientes,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaProveedors',
    //   setter: setTotalProveedores,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaCategorias',
    //   setter: setTotalCategorias,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaProductos',
    //   setter: setTotalProductos,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaFacturas',
    //   setter: setTotalFacturas,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasTotales',
    //   setter: setExistenciaTotal,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasVendidas',
    //   setter: setExistenciaVendida,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaExistenciasActuales',
    //   setter: setExistenciaActual,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaImporteVendido',
    //   setter: setTotalImporteVendido,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaImportePagado',
    //   setter: setTotalImportePagado,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaBeneficioBruto',
    //   setter: setTotalbeneficioBruto,
    // },
    // {
    //   url: 'https://localhost:7073/inventario-service/Dashboard/TarjetaBeneficioNeto',
    //   setter: setTotalBeneficioNeto,
    // },
  ];

  useEffect(() => {
    fetchItems.forEach(({ url, setter }) => fetchData(url, setter));
  }, []);

  return (
    <div className="shadow-md h-11-12 bg-[#f5f5fe]">
      <section className="flex flex-col overflow-y-auto h-full gap-2 p-4 mb-9 ">
        <div className="flex gap-3 justify-center">
          <CardGeneral
            nombre={"Clientes"}
            cantidad={totalClientes}
            logo={<ClienteIcon clases={"size-12"} />}
            color={"bg-slate-300"}
          />
          <CardGeneral
            nombre={"Clientes"}
            cantidad={totalClientes}
            logo={<ClienteIcon clases={"size-12"} />}
            color={"bg-slate-600"}
          />
          <CardGeneral
            nombre={"Clientes"}
            cantidad={totalClientes}
            logo={<ClienteIcon clases={"size-12"} />}
            color={"bg-slate-100"}
          />
          <CardGeneral
            nombre={"Clientes"}
            cantidad={totalClientes}
            logo={<ClienteIcon clases={"size-12"} />}
            color={"bg-slate-800"}
          />
          <CardGeneral
            nombre={"Clientes"}
            cantidad={totalClientes}
            logo={<ClienteIcon clases={"size-12"} />}
            color={"bg-slate-200"}
          />
        </div>
        <div className="flex justify-between gap-1">
          <LineComprasVentas />
          <UtilidadProductos />
        </div>
        <div className="flex justify-center gap-1">
          <TopVendidos />
          <BarChartGanancias />
        </div>
      </section>
    </div>
  );
};
const DashboardPage = () => {
  return <PanelDivisor Page={<Page />} />;
};

export default DashboardPage;
