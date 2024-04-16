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
  const [totalProductos, setTotalProductos] = useState(0)
  const [totalProveedores, setTotalProveedores] = useState(0)
  const [existenciaTotal, setExistenciaTotal] = useState(0)
  const [existenciaActual, setExistenciaActual] = useState(0)

  useEffect(() => {
    fetch('https://localhost:7127/api/Dashboard/TarjetaClientes')
      .then((response) => response.text())
      .then((data) => setTotalClientes(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaProveedors')
      .then((response) => response.text())
      .then((data) => setTotalProductos(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaProductos')
      .then((response) => response.text())
      .then((data) => setTotalProveedores(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaExistenciasTotales')
      .then((response) => response.text())
      .then((data) => setExistenciaTotal(parseInt(data)))

    fetch('https://localhost:7127/api/Dashboard/TarjetaExistenciasActuales')
      .then((response) => response.text())
      .then((data) => setExistenciaActual(parseInt(data)))
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
          nombre={'Productos'}
          cantidad={totalProductos}
          logo={<ProductosIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Proveedores'}
          cantidad={totalProveedores}
          logo={<ProvedoresIcon clases={'size-12'} />}
        />
        {/* <CardGeneral
          nombre={'Facturas'}
          cantidad={2000}
          logo={<FacturaIcon clases={'size-12'} />}
        /> */}
        <CardGeneral
          nombre={'Existencia total'}
          cantidad={existenciaTotal}
          logo={<ExistenciaTotalIcon clases={'size-12'} />}
        />
        {/* <CardGeneral
          nombre={'Existencia vendida'}
          cantidad={2000}
          logo={<ExistenciaVendidaIcon clases={'size-12'} />}
        /> */}
        <CardGeneral
          nombre={'Existencia actual'}
          cantidad={existenciaActual}
          logo={<ExistenciaActualIcon clases={'size-12'} />}
        />
        {/* <CardGeneral
          nombre={'Importe vendido'}
          cantidad={'$2000'}
          logo={<ImporteVendidoIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Importe pagado'}
          cantidad={'$2000'}
          logo={<ImportePagadoIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Importe restante'}
          cantidad={'$2000'}
          logo={<ImporteRestanteIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Beneficio bruto'}
          cantidad={'$2000'}
          logo={<BeneficioBrutoIcon clases={'size-12'} />}
        />
        <CardGeneral
          nombre={'Beneficio neto'}
          cantidad={'$2000'}
          logo={<BeneficioTotalIcon clases={'size-12'} />}
        /> */}
        {/* <CategoryList /> */}
      </section>
    </div>
  )
}
const DashboardPage = () => {
  return <PanelDivisor Page={<Page />} />
}

export default DashboardPage
