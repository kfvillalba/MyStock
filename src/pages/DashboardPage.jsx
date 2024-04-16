import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
import ClienteIcon from '../assets/ClienteIcon'
import ProductosIcon from '../assets/ProductosIcon'
import { CardGeneral } from '../components/CardGeneral'
import ProvedoresIcon from '../assets/ProveedoresIcon'
import { CategoryList } from '../components/CategoryList'
import FacturaIcon from '../assets/FacturaIcon'
import ExistenciaTotalIcon from '../assets/ExistenciaTotalIcon'
import ExistenciaVendidaIcon from '../assets/ExistenciaVendidaIcon'
import ExistenciaActualIcon from '../assets/ExistenciaActualIcon'
import ImporteVendidoIcon from '../assets/ImporteVendido'
import ImportePagadoIcon from '../assets/ImportePagado'
import ImporteRestanteIcon from '../assets/ImporteRestante'
import BeneficioBrutoIcon from '../assets/BeneficioBrutoIcon'
import BeneficioTotalIcon from '../assets/BeneficioTotalIcon'

const Page = () => {
  const [totalClientes, setTotalClientes] = useState(0)
  const [totalProveedores, setTotalProveedores] = useState(0)
  const [totalCategorias, setTotalCategorias] = useState(0)
  const [totalProductos, setTotalProductos] = useState(0)
  const [totalFacturas, setTotalFacturas] = useState(0)
  const [existenciaTotal, setExistenciaTotal] = useState(0)
  const [existenciaVendida, setExistenciaVendida] = useState(0)
  const [existenciaActual, setExistenciaActual] = useState(0)
  const [totalImporteVendido, setTotalImporteVendido] = useState(0)
  const [totalImportePagado, setTotalImportePagado] = useState(0)
  const [totalBeneficioBruto, setTotalbeneficioBruto] = useState(0)
  const [totalBeneficioNeto, setTotalBeneficioNeto] = useState(0)

  useEffect(() => {
    fetch('https://localhost:7127/api/Dashboard/TarjetaClientes')
      .then((response) => response.text())
      .then((data) => setTotalClientes(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaProveedors')
      .then((response) => response.text())
      .then((data) => setTotalProveedores(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaCategorias')
      .then((response) => response.text())
      .then((data) => setTotalCategorias(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaProductos')
      .then((response) => response.text())
      .then((data) => setTotalProductos(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaFacturas')
      .then((response) => response.text())
      .then((data) => setTotalFacturas(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaExistenciasTotales')
      .then((response) => response.text())
      .then((data) => setExistenciaTotal(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaExistenciasVendidas')
      .then((response) => response.text())
      .then((data) => setExistenciaVendida(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaExistenciasActuales')
      .then((response) => response.text())
      .then((data) => setExistenciaActual(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaImporteVendido')
      .then((response) => response.text())
      .then((data) => setTotalImporteVendido(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaImportePagado')
      .then((response) => response.text())
      .then((data) => setTotalImportePagado(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaBeneficioBruto')
      .then((response) => response.text())
      .then((data) => setTotalbeneficioBruto(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaBeneficioNeto')
      .then((response) => response.text())
      .then((data) => setTotalBeneficioNeto(parseInt(data)))
  }, [])
  return (
    <div>
      <section className='flex flex-wrap gap-5 p-4 mr-4'>
        <CardGeneral
          nombre={'Clientes'}
          cantidad={totalClientes}
          logo={<ClienteIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Proveedores'}
          cantidad={totalProveedores}
          logo={<ProvedoresIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Categorias'}
          cantidad={totalCategorias}
          logo={<ImporteRestanteIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Productos'}
          cantidad={totalProductos}
          logo={<ProductosIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Facturas'}
          cantidad={totalFacturas}
          logo={<FacturaIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Existencia total'}
          cantidad={existenciaTotal}
          logo={<ExistenciaTotalIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Existencia vendida'}
          cantidad={existenciaVendida}
          logo={<ExistenciaVendidaIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Existencia actual'}
          cantidad={existenciaActual}
          logo={<ExistenciaActualIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Importe vendido'}
          cantidad={totalImporteVendido}
          logo={<ImporteVendidoIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Importe pagado'}
          cantidad={totalImportePagado}
          logo={<ImportePagadoIcon clases={'size-12'} />}
        />

        <CardGeneral
          nombre={'Beneficio bruto'}
          cantidad={totalBeneficioBruto}
          logo={<BeneficioBrutoIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Beneficio neto'}
          cantidad={totalBeneficioNeto}
          logo={<BeneficioTotalIcon clases={'size-12'} />}
        />
        {/* <CategoryList /> */}
      </section>
    </div>
  )
}
const DashboardPage = () => {
  return <PanelDivisor Page={<Page />} />
}

export default DashboardPage
