import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import { useForm } from 'react-hook-form'
import {
  generateVentasPDF,
  generateSalidaClientesPDF,
  generateComprasPDF,
  generateEntradaProveedoresPDF,
  generateProductosVendidosPDF,
  generateSalidaClientesActualPDF,
  generateProductosSalidaActualPDF,
  generateProductosExistencia0PDF,
  generateProductosBajaExistenciaPDF,
  generateVentasActualPDF,
  generateComprasActualPDF,
  generateEntradaProveedoresActualPDF,
} from '../components/Reportes/TablasReportes'
import Swal from 'sweetalert2'
import ModalVerReporte from '../components/Reportes/modalVerReporte'
import { TbReportAnalytics } from 'react-icons/tb'
import '../index.css'

const Page = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      let pdfUrl = ''
      if (tipoReporte === '1') {
        if (reporte === '1') {
          pdfUrl = await generateVentasPDF(data)
        } else if (reporte === '2') {
          pdfUrl = await generateSalidaClientesPDF(data)
        } else if (reporte === '3') {
          pdfUrl = await generateComprasPDF(data)
        } else if (reporte === '4') {
          pdfUrl = await generateEntradaProveedoresPDF(data)
        } else if (reporte === '5') {
          pdfUrl = await generateProductosVendidosPDF(data)
        }
      }
      if (tipoReporte === '2') {
        if (reporte === '1') {
          pdfUrl = await generateVentasActualPDF()
        } else if (reporte === '2') {
          pdfUrl = await generateSalidaClientesActualPDF()
        } else if (reporte === '3') {
          pdfUrl = await generateComprasActualPDF(data)
        } else if (reporte === '4') {
          pdfUrl = await generateEntradaProveedoresActualPDF(data)
        } else if (reporte === '5') {
          pdfUrl = await generateProductosSalidaActualPDF()
        }
      }
      if (tipoReporte === '3') {
        if (reporte === '1') {
          pdfUrl = await generateProductosExistencia0PDF()
        } else if (reporte === '2') {
          pdfUrl = await generateProductosBajaExistenciaPDF()
        }
      }
      setPdfData(pdfUrl)
      if (pdfUrl) {
        Swal.fire({
          icon: 'success',
          title: 'Reporte generado correctamente',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('Error al generar el reporte')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay datos',
      })
    }
  }

  const [pdfData, setPdfData] = useState('')
  const [showModal, setShowModal] = useState(false)

  const handleGenerateReport = () => {
    setPdfData(pdfData)
    setShowModal(true)
  }

  const [categoriasOptions, setCategoriasOptions] = useState([])
  const [productosOptions, setProductosOptions] = useState([])
  const [clientesOptions, setClientesOptions] = useState([])
  const [proveedoresOptions, setProveedoresOptions] = useState([])

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Salidas/ConsultarTodo'
        )
        if (response.ok) {
          const data = await response.json()
          const clientesSet = new Set()
          const clientes = data.reduce((acc, { clienteId, clienteNombre }) => {
            if (!clientesSet.has(clienteId)) {
              clientesSet.add(clienteId)
              acc.push({ clienteId, clienteNombre })
            }
            return acc
          }, [])
          setClientesOptions(clientes)
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error al cargar los clientes:', error)
      }
    }

    const fetchProveedores = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Entradas/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          const proveedoresSet = new Set()
          const proveedores = data.reduce(
            (acc, { idProveedor, nombreProveedor }) => {
              if (!proveedoresSet.has(idProveedor)) {
                proveedoresSet.add(idProveedor)
                acc.push({ idProveedor, nombreProveedor })
              }
              return acc
            },
            []
          )
          setProveedoresOptions(proveedores)
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error al cargar los proveedores:', error)
      }
    }

    const fetchEntradasCategorias = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Entradas/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          const categoriasSet = new Set()
          const categorias = data.reduce(
            (acc, { idCategoria, nombreCategoria }) => {
              if (!categoriasSet.has(idCategoria)) {
                categoriasSet.add(idCategoria)
                acc.push({ idCategoria, nombreCategoria })
              }
              return acc
            },
            []
          )
          setCategoriasOptions(categorias)
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error al cargar las categorías:', error)
      }
    }

    fetchClientes()
    fetchProveedores()
    fetchEntradasCategorias()
  }, [])

  const handleCategoriaChange = async (event) => {
    const idCategoria = event.target.value
    setProductosOptions([])

    if (idCategoria !== '-1') {
      try {
        const response = await fetch(
          `https://localhost:7073/inventario-service/Entradas/Filtrar/IdCategoria?idCategoria=${idCategoria}`
        )
        if (response.ok) {
          const data = await response.json()
          const productosSet = new Set()
          const productosUnicos = data.reduce(
            (acc, { idProducto, nombreProducto }) => {
              if (!productosSet.has(idProducto)) {
                productosSet.add(idProducto)
                acc.push({ idProducto, nombreProducto })
              }
              return acc
            },
            []
          )
          setProductosOptions(productosUnicos)
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error al cargar los productos:', error)
      }
    }
  }

  const handleProductoChange = async (event) => {
    const idProducto = event.target.value

    if (idProducto !== '-1') {
      try {
        const response = await fetch(
          `https://localhost:7073/inventario-service/Entradas/Filtrar/IdProductos?idProductos=${idProducto}`
        )
        if (response.ok) {
          const data = await response.json()
          const stockSet = new Set()
          const stock = data.reduce((acc, { id }) => {
            if (!stockSet.has(id)) {
              stockSet.add(id)
              acc.push({ id })
            }
            return acc
          }, [])
        } else {
          const errorText = await response.text()
          throw new Error(errorText)
        }
      } catch (error) {
        console.error('Error al cargar el stock:', error)
      }
    }
  }

  const [tipoReporte, setTipoReporte] = useState('-1')
  const [reporte, setReporte] = useState('-1')

  const handleTipoReporteChange = (event) => {
    setTipoReporte(event.target.value)
    setReporte('-1')
    console.log('tipo reporte', tipoReporte)
  }

  const handleReporteChange = (event) => {
    setReporte(event.target.value)
    console.log('reporte', reporte)
  }

  return (
    <>
      {showModal && (
        <ModalVerReporte onClose={() => setShowModal(false)}>
          <embed
            src={pdfData}
            type='application/pdf'
            width='800px'
            height='570px'
          />
        </ModalVerReporte>
      )}
      <div className='shadow-md h-full w-full pb-6'>
        <form
          className='bg-white rounded-lg m-3 flex shadow-sm shadow-gray-400 justify-center h-full p-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='w-1/2'>
            <div className='h-11-12 overflow-y-auto'>
              <div>
                <label className='label__form' htmlFor='tipoReporte'>
                  Seleccione el Tipo de reporte
                </label>
                <select
                  className='input__form'
                  name='tipoReporte'
                  id='tipoReporte'
                  value={tipoReporte}
                  onChange={handleTipoReporteChange}
                >
                  <option value='-1'>Seleccione un tipo de reporte</option>
                  <option value='1'>Reporte Entre Fechas</option>
                  <option value='2'>Reporte Día Actual</option>
                  <option value='3'>Reporte de Información Productos</option>
                </select>
                {tipoReporte === '1' && (
                  <div>
                    <label className='label__form' htmlFor='producto'>
                      Seleccionar reporte
                    </label>
                    <select
                      className='input__form'
                      name='producto'
                      id='tipoReporte'
                      onChange={handleReporteChange}
                    >
                      <option value=''>Seleccione el tipo de reporte</option>
                      <option value='1'>Ventas</option>
                      <option value='2'>Salidas de clientes</option>
                      <option value='3'>Compras</option>
                      <option value='4'>Entrada de proveedores</option>
                      <option value='5'>Productos vendidos</option>
                    </select>
                    <span className='message'>{errors?.producto?.message}</span>
                  </div>
                )}
                {tipoReporte === '1' && (
                  <div>
                    <label className='label__form' htmlFor='fechaInicio'>
                      Fecha de Inicio
                    </label>
                    <input
                      className='input__form'
                      type='date'
                      name='fechaInicio'
                      id='fechaInicio'
                      {...register('fechaInicio')}
                    />
                    <span className='message'></span>
                  </div>
                )}

                {tipoReporte === '1' && (
                  <div>
                    <label className='label__form' htmlFor='fechaFinal'>
                      Fecha de Final
                    </label>
                    <input
                      className='input__form'
                      type='date'
                      name='fechaFinal'
                      id='fechaFinal'
                      {...register('fechaFinal')}
                    />
                    <span className='message'></span>
                  </div>
                )}

                {tipoReporte === '2' && (
                  <div>
                    <label className='label__form' htmlFor='producto'>
                      Seleccionar reporte
                    </label>
                    <select
                      className='input__form'
                      name='producto'
                      id='tipoReporte'
                      onChange={handleReporteChange}
                    >
                      <option value='-1'>Selecciones el tipo de reporte</option>
                      <option value='1'>Ventas</option>
                      <option value='2'>Cliente salidas</option>
                      <option value='3'>Compras</option>
                      <option value='4'>Entrada de proveedores</option>
                      <option value='5'>Salida de productos</option>
                    </select>
                    <span className='message'>{errors?.producto?.message}</span>
                  </div>
                )}
                {tipoReporte === '3' && (
                  <div>
                    <label className='label__form' htmlFor='producto'>
                      Seleccionar reporte
                    </label>
                    <select
                      className='input__form'
                      name='producto'
                      id='tipoReporte'
                      onChange={handleReporteChange}
                    >
                      <option value='-1'>Seleccione el tipo de reporte</option>
                      <option value='1'>Productos sin existencia</option>
                      <option value='2'>Productos con baja existencia</option>
                    </select>
                    <span className='message'>{errors?.producto?.message}</span>
                  </div>
                )}
              </div>
              {(reporte === '3' || reporte === '5') && tipoReporte !== '-1' && (
                <div>
                  <label className='label__form' htmlFor='categoria'>
                    Seleccione una Categoria (Opcional)
                  </label>
                  <select
                    className='input__form'
                    name='categoria'
                    id='tipoReporte'
                    {...register('categoria')}
                    onChange={handleCategoriaChange}
                  >
                    <option value='-1'>Seleccione una categoria</option>
                    {categoriasOptions?.map((categoria) => {
                      return (
                        <option
                          key={categoria.id}
                          value={`${categoria.idCategoria}`}
                        >
                          {categoria.nombreCategoria}
                        </option>
                      )
                    })}
                  </select>
                  <span className='message'>{errors?.categoria?.message}</span>
                </div>
              )}
              {(reporte === '3' || reporte === '5') && tipoReporte !== '-1' && (
                <div>
                  <label className='label__form' htmlFor='producto'>
                    Seleccione un producto (Opcional)
                  </label>
                  <select
                    className='input__form'
                    name='producto'
                    id='tipoReporte'
                    {...register('producto')}
                    onChange={handleProductoChange}
                  >
                    <option value='-1'>Seleccione un producto</option>
                    {productosOptions?.map((producto) => {
                      return (
                        <option
                          key={producto.idProducto}
                          value={`${producto.idProducto}`}
                        >
                          {producto.nombreProducto}
                        </option>
                      )
                    })}
                  </select>
                  <span className='message'>{errors?.producto?.message}</span>
                </div>
              )}
              {(reporte === '1' || reporte === '2') && tipoReporte !== '-1' && (
                <div>
                  <label className='label__form' htmlFor='cliente'>
                    Seleccione un cliente (Opcional)
                  </label>
                  <select
                    className='input__form'
                    name='cliente'
                    id='tipoReporte'
                    {...register('clienteId')}
                  >
                    <option value='-1'>Seleccione un cliente</option>
                    {clientesOptions?.map((cliente) => {
                      return (
                        <option
                          key={cliente.clienteId}
                          value={`${cliente.clienteId}`}
                        >
                          {cliente.clienteNombre}
                        </option>
                      )
                    })}
                  </select>
                  <span className='message'>{errors?.cliente?.message}</span>
                </div>
              )}
              {(reporte === '3' || reporte === '4') && tipoReporte !== '-1' && (
                <div>
                  <label className='label__form' htmlFor='proveedor'>
                    Seleccione un proveedor (Opcional)
                  </label>
                  <select
                    className='input__form'
                    name='proveedor'
                    id='tipoReporte'
                    {...register('proveedor')}
                  >
                    <option value='-1'>Seleccione un proveedor</option>
                    {proveedoresOptions?.map((proveedor) => {
                      return (
                        <option
                          key={proveedor.idProveedor}
                          value={`${proveedor.idProveedor}`}
                        >
                          {proveedor.nombreProveedor}
                        </option>
                      )
                    })}
                  </select>
                  <span className='message'>{errors?.proveedor?.message}</span>
                </div>
              )}
              <div className='text-center'></div>
            </div>
          </div>
          <div className='w-1/3'>
            <div className='flex flex-col items-center'>
              <TbReportAnalytics className='size-96 icon-green' />
              <button
                type='submit'
                className='bnt__primary bg-slate-500/30 mt-5 font-semibold text-black'
                onClick={handleGenerateReport}
              >
                Generar Reporte
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

const PageReportes = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageReportes
