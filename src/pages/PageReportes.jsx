import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
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
} from '../components/TablasReportes'
import Swal from 'sweetalert2'

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
        if (data.reporte === '1') {
          pdfUrl = await generateVentasPDF(data)
        } else if (data.reporte === '2') {
          pdfUrl = await generateSalidaClientesPDF(data)
        } else if (data.reporte === '3') {
          pdfUrl = await generateComprasPDF(data)
        } else if (data.reporte === '4') {
          pdfUrl = await generateEntradaProveedoresPDF(data)
        } else if (data.reporte === '5') {
          pdfUrl = await generateProductosVendidosPDF(data)
        }
      }
      if (tipoReporte === '2') {
        if (data.reporte === '1') {
          pdfUrl = await generateVentasPDF()
        } else if (data.reporte === '2') {
          pdfUrl = await generateSalidaClientesActualPDF()
        } else if (data.reporte === '3') {
          // pdfUrl = await generateSalidaClientesActualPDF(data)
        } else if (data.reporte === '4') {
          // pdfUrl = await generateSalidaClientesActualPDF(data)
        } else if (data.reporte === '5') {
          pdfUrl = await generateProductosSalidaActualPDF()
        }
      }
      if (tipoReporte === '3') {
        if (data.reporte === '1') {
          pdfUrl = await generateProductosExistencia0PDF()
        } else if (data.reporte === '2') {
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
        text: 'Hubo un problema al generar el informe',
      })
    }
  }

  const [pdfData, setPdfData] = useState('')

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
          throw new Error('Error al cargar las categorías')
        }
      } catch (error) {
        console.error(error)
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
          throw new Error('Error al cargar las categorías')
        }
      } catch (error) {
        console.error(error)
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
          throw new Error('Error al cargar las categorías')
        }
      } catch (error) {
        console.error(error)
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
          `https://localhost:7073/inventario-service//Entradas/Filtrar/IdCategoria?idCategoria=${idCategoria}`
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
          throw new Error('Error al cargar los productos')
        }
      } catch (error) {
        console.error(error)
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
          throw new Error('Error al cargar el stock')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const [tipoReporte, setTipoReporte] = useState('-1')

  const handleTipoReporteChange = (event) => {
    setTipoReporte(event.target.value)
  }

  return (
    <div
      className='gap-4 p-10 shadow-md  shadow-black '
      style={{ maxHeight: 'calc(100vh - 80px)', overflowY: 'auto' }}
    >
      <form
        className='bg-white rounded-lg shadow-sm flex flex-col h-full p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='h-full'>
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
                  {...register('reporte')}
                >
                  <option value='-1'>Seleccione el tipo de reporte</option>
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
                  {...register('reporte')}
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
                  {...register('reporte')}
                >
                  <option value='-1'>Seleccione el tipo de reporte</option>
                  <option value='1'>Productos sin existencia</option>
                  <option value='2'>Productos con baja existencia</option>
                </select>
                <span className='message'>{errors?.producto?.message}</span>
              </div>
            )}
          </div>

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
                  <option key={categoria.id} value={`${categoria.idCategoria}`}>
                    {categoria.nombreCategoria}
                  </option>
                )
              })}
            </select>
            <span className='message'>{errors?.categoria?.message}</span>
          </div>
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
          <div>
            <label className='label__form' htmlFor='cliente'>
              Seleccione un cliente (Opcional)
            </label>
            <select
              className='input__form'
              name='cliente'
              id='tipoReporte'
              {...register('cliente')}
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
        </div>
        <section className='self-end'>
          <button type='submit' className='bnt__primary mt-5 '>
            Generar Reporte
          </button>
          {pdfData && (
            <a
              href={pdfData}
              download='reporte.pdf'
              className='mt-3 block text-center text-blue-500 font-medium'
            >
              Descargar PDF
            </a>
          )}
        </section>
      </form>
    </div>
  )
}

const PageReportes = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageReportes
