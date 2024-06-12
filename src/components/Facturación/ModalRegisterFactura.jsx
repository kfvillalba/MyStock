import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import DeleteIcon from '../../assets/DeleteIcon'
import ModalRegisterClientes from '../Clientes/ModalRegisterClientes'
import { fetchClients } from '../Fetchs/API_INV'

const ModalRegisterFactura = ({ open, onClose, registrar }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm()

  const [categoriasOptions, setCategoriasOptions] = useState([])
  const [productosOptions, setProductosOptions] = useState([])
  const [clientesOptions, setClientesOptions] = useState([])
  const [stockOptions, setStockOptions] = useState([])
  const [precioProducto, setPrecioProducto] = useState(0)
  const [clienteFilter, setClienteFilter] = useState('')
  const [filteredClientes, setFilteredClientes] = useState([])
  const [selectedClient, setSelectedClient] = useState(null)
  const [selectedClientId, setSelectedClientId] = useState(null)

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Clientes/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          setClientesOptions(data)
          setFilteredClientes(data)
        } else {
          throw new Error('Error al cargar los proveedores')
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
    fetchEntradasCategorias()
  }, [])

  const handleClienteFilterChange = (event) => {
    const value = event.target.value.toLowerCase()
    setClienteFilter(value)
    const filtered = clientesOptions.filter((cliente) =>
      cliente.nombre.toLowerCase().includes(value)
    )
    setFilteredClientes(filtered)
    setSelectedClient(null)
  }

  const handleClientSelect = (client) => {
    setSelectedClient(client)
    setSelectedClientId(client.id)
    setClienteFilter(client.nombre)
    setValue('cliente', client.id)
  }

  const handleCategoriaChange = async (event) => {
    const idCategoria = event.target.value
    setProductosOptions([])
    setStockOptions([])

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
    setStockOptions([])

    if (idProducto !== '-1') {
      try {
        const response = await fetch(
          `https://localhost:7073/inventario-service/Entradas/Filtrar/IdProductos?idProductos=${idProducto}`
        )
        if (response.ok) {
          const data = await response.json()
          const stockSet = new Set()
          const stock = data.reduce(
            (acc, { id, existenciaActual, precioVenta }) => {
              if (!stockSet.has(id) && existenciaActual > 0) {
                stockSet.add(id)
                acc.push({ id, existenciaActual, precioVenta })
              }
              return acc
            },
            []
          )
          setStockOptions(stock)
        } else {
          throw new Error('Error al cargar el stock')
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const obtenerPrecioVentaActual = () => {
    return (
      stockOptions.find((stock) => stock.id === parseInt(watch('idEntrada')))
        ?.precioVenta || ''
    )
  }
  const precioVentaActual = obtenerPrecioVentaActual()

  const calculateTotal = () => {
    setPrecioProducto(precioVentaActual)
    const cantidad = parseFloat(watch('cantidad') || 0)
    const precio = parseFloat(precioProducto || 0)
    const descuento = parseFloat(watch('descuento') || 0)

    const total =
      (Math.floor(cantidad * precio - (cantidad * precio * descuento) / 100) *
        100) /
      100

    setValue('total', total)

    return total
  }

  useEffect(() => {
    calculateTotal()
  }, [watch('cantidad'), watch('descuento')])

  const totales = {}
  const [detalleFactura, setDetalleFactura] = useState([])
  function getTotales() {
    totales.totalProductos = 0
    totales.totalSinDescuento = 0
    totales.totalDescuento = 0
    totales.totalPagar = 0
    detalleFactura.map((detalle) => {
      const cantidad = parseFloat(detalle.cantidad)
      const precio = parseFloat(detalle.precio)
      const total = parseFloat(detalle.total)
      const valorDescuento = parseFloat(detalle.valorDescuento)

      totales.totalProductos += cantidad
      totales.totalSinDescuento += cantidad * precio
      totales.totalDescuento += valorDescuento
      totales.totalPagar += total
    })
  }
  getTotales()

  const SumarExistencias = async () => {
    const idsEntradas = detalleFactura.map((detalle) => detalle.idEntrada)
    const cantidades = detalleFactura.map((detalle) => detalle.cantidad)

    for (let i = 0; i < idsEntradas.length; i++) {
      const idEntrada = idsEntradas[i]
      const quitarExistencia = cantidades[i]
      const restarExistenciasResponse = await fetch(
        `https://localhost:7073/inventario-service/Entradas/SumarExistencias?id=${idEntrada}&nuevaExistencia=${quitarExistencia}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )
      if (!restarExistenciasResponse.ok) {
        throw new Error('Error al restar existencias')
      }
    }
  }

  const agregarDetalle = async (e) => {
    e.preventDefault()

    const categoriaSeleccionada = categoriasOptions.find(
      (categoria) => categoria.idCategoria === parseInt(watch('categoria'))
    )
    const productoSeleccionado = productosOptions.find(
      (producto) => producto.idProducto === parseInt(watch('producto'))
    )

    const stockSeleccionado = stockOptions.find(
      (stock) => stock.id === parseInt(watch('idEntrada'))
    )

    const existenciaActual = stockSeleccionado
      ? stockSeleccionado.existenciaActual
      : 0

    if (!categoriaSeleccionada) {
      Swal.fire('Error', 'Debe seleccionar una categoría', 'error')
      return
    }
    if (!productoSeleccionado) {
      Swal.fire('Error', 'Debe seleccionar un producto', 'error')
      return
    }
    if (!stockSeleccionado) {
      Swal.fire('Error', 'Debe seleccionar el stock', 'error')
      return
    }

    const cantidad = parseFloat(watch('cantidad'))
    const precio = parseFloat(precioProducto)
    const descuento = parseFloat(watch('descuento'))
    if (cantidad <= 0) {
      Swal.fire(
        'Error',
        'La cantidad ingresada no puede ser menor o igual a 0 ',
        'error'
      )
      return
    }
    if (isNaN(cantidad)) {
      Swal.fire('Error', 'La cantidad no puede estar vacia', 'error')
      return
    }
    if (cantidad > existenciaActual) {
      Swal.fire('Error', 'La cantidad no puede ser mayor al stock', 'error')
      return
    }
    if (precio <= 0 || isNaN(precio)) {
      Swal.fire('Error', 'El precio ingresado no es válido', 'error')
      return
    }
    if (
      descuento < 0 ||
      isNaN(descuento) ||
      descuento % 1 !== 0 ||
      descuento > 100
    ) {
      Swal.fire('Error', 'El descuento ingresado no es válido', 'error')
      return
    }

    const detalle = {
      categoria: categoriaSeleccionada
        ? categoriaSeleccionada.nombreCategoria
        : '',
      producto: productoSeleccionado ? productoSeleccionado.nombreProducto : '',
      idCategoria: categoriaSeleccionada
        ? categoriaSeleccionada.idCategoria
        : 0,
      idEntrada: parseInt(watch('idEntrada')),
      stock: stockSeleccionado ? stockSeleccionado.existenciaActual : 0,
      idProducto: productoSeleccionado ? productoSeleccionado.idProducto : 0,
      cantidad: parseFloat(watch('cantidad')),
      precio: parseFloat(precioProducto),
      descuento: parseFloat(watch('descuento')),
      valorDescuento: parseFloat(
        (watch('cantidad') * precioProducto * watch('descuento')) / 100
      ).toFixed(2),
      total: calculateTotal(),
    }
    try {
      const restarExistenciasResponse = await fetch(
        `https://localhost:7073/inventario-service/Entradas/RestarExistencia?id=${detalle.idEntrada}&quitarExistencia=${detalle.cantidad}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )
      if (!restarExistenciasResponse.ok) {
        throw new Error('Error al restar existencias')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', error.message, 'error')
      return
    }
    reset()
    setDetalleFactura([
      ...detalleFactura,
      { ...detalle, id: Math.random().toString(36).substring(7) },
    ])
    const currentCliente = watch('cliente')
    reset({
      cliente: currentCliente,
    })
  }

  const eliminarDetalle = async (index) => {
    try {
      const detalle = detalleFactura[index]

      const agregarExistenciasResponse = await fetch(
        `https://localhost:7073/inventario-service/Entradas/SumarExistencias?id=${detalle.idEntrada}&nuevaExistencia=${detalle.cantidad}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({}),
        }
      )

      if (!agregarExistenciasResponse.ok) {
        throw new Error('Error al agregar existencias')
      }

      setDetalleFactura(detalleFactura.filter((detalle, idx) => idx !== index))
    } catch (error) {
      console.error(error)
      Swal.fire('Error', error.message, 'error')
    }
  }

  const onSubmit = async () => {
    try {
      if (detalleFactura.length === 0) {
        Swal.fire('Error', 'Debe agregar un producto', 'error')

        return
      }
      const idCliente = selectedClientId
      if (!idCliente) {
        Swal.fire('Error', 'Debe seleccionar un cliente', 'error')
        return
      }
      const cantidadProductos = detalleFactura.length
      const totalPagarSinDescuento = totales.totalSinDescuento * 1000
      const totalDescuento = totales.totalDescuento
      const totalPagarConDescuento = totales.totalPagar * 1000

      const productoSalidas = detalleFactura.map((detalle) => {
        return {
          idCategoria: parseInt(detalle.idCategoria),
          idProducto: parseInt(detalle.idProducto),
          idEntrada: parseInt(detalle.idEntrada),
          precio: parseFloat(detalle.precio * 1000),
          cantidad: parseFloat(detalle.cantidad),
          descuento: parseFloat(detalle.descuento),
          valorDescuento: parseFloat(detalle.valorDescuento * 1000),
          total: parseFloat(detalle.total * 1000),
        }
      })

      const factura = {
        idCliente,
        cantidadProductos,
        totalPagarConDescuento,
        totalPagarSinDescuento,
        totalDescuento,
        productoSalidas,
      }
      console.log('fac', factura)

      const response = await fetch(
        'https://localhost:7073/inventario-service/Salidas/Agregar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(factura),
        }
      )

      if (response.ok) {
        Swal.fire('¡Factura registrada!', '', 'success')
        reset()
        onClose()
      } else {
        throw new Error('Error al registrar la factura')
      }
    } catch (error) {
      console.error(error)
      Swal.fire('Error', error.message, 'error')
    }
  }
  const [formRegister, setformRegister] = useState(false)

  if (!open) return null
  return (
    <>
      <ModalRegisterClientes
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          fetchClients().then((clientes) => setClientesOptions(clientes))
        }}
      />
      <div className='fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50'>
        <form
          className='bg-white rounded-lg shadow-sm p-5 w-full mx-32'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
            <h3>Nueva Factura</h3>
            <section className='flex flex-col gap-4 my-5'>
              <div className='flex flex-row'>
                <div className='flex flex-col'>
                  <input
                    type='text'
                    className='input__form'
                    placeholder='Buscar cliente'
                    value={clienteFilter}
                    onChange={handleClienteFilterChange}
                  />

                  {clienteFilter && !selectedClient && (
                    <ul className='absolute z-10 bg-white mt-12 rounded-sm shadow-md max-h-60 w-auto overflow-y-auto'>
                      {filteredClientes.map((cliente) => (
                        <li
                          key={cliente.id}
                          className='px-2 py-1 cursor-pointer hover:bg-gray-200'
                          onClick={() => handleClientSelect(cliente)}
                        >
                          {cliente.nombre}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button
                  type='button'
                  className='bnt__primary ml-2'
                  onClick={() => setformRegister(true)}
                >
                  Agregar cliente
                </button>
              </div>

              <div className='h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm'>
                <table className='w-full table-auto '>
                  <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                    <tr>
                      <th>#</th>
                      <th>Categoria</th>
                      <th>Producto</th>
                      <th>Stock</th>
                      <th>Cantidad</th>
                      <th>Precio</th>
                      <th>Descuento %</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detalleFactura?.map((detalle, index) => {
                      return (
                        <tr
                          className='text-center even:bg-slate-100'
                          key={index}
                        >
                          <td className='text-center text-red-800'>
                            <button
                              type='button'
                              onClick={() => eliminarDetalle(index)}
                            >
                              <DeleteIcon clases={'size-7 cursor-pointer'} />
                            </button>
                          </td>
                          <td>{detalle.categoria}</td>
                          <td>{detalle.producto}</td>
                          <td>{detalle.stock}</td>
                          <td>{detalle.cantidad}</td>
                          <td>
                            {detalle.precio
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          </td>
                          <td>{detalle.descuento}</td>
                          <td>
                            {detalle.total
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                          </td>
                        </tr>
                      )
                    })}
                    <tr className='even:bg-slate-100'>
                      <td className='text-center text-red-800'></td>
                      <td>
                        <div className='flex flex-col'>
                          <select
                            type='text'
                            className='select__table'
                            {...register('categoria')}
                            onChange={handleCategoriaChange}
                          >
                            <option value='-1'>Seleccione un categoria</option>
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
                          <span className='message'>
                            {errors?.categoria?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='flex flex-col'>
                          <select
                            type='text'
                            className='select__table'
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
                          <span className='message'>
                            {errors?.producto?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className='flex flex-col'>
                          <select
                            type='text'
                            className='select__table'
                            {...register('idEntrada')}
                          >
                            <option value='-1'>Seleccione el stock</option>
                            {stockOptions?.map((stock) => {
                              return (
                                <option key={stock.id} value={`${stock.id}`}>
                                  {stock.existenciaActual}
                                </option>
                              )
                            })}
                          </select>
                          <span className='message'>
                            {errors?.idEntrada?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type='number'
                            className='input__form no-spinner'
                            {...register('cantidad', {
                              required: false,
                              min: {
                                value: 0,
                                message: 'Ingrese numeros validos',
                              },
                              valueAsNumber: true,
                            })}
                          />
                          <span className='message'>
                            {errors?.cantidad?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type='number'
                            className='input__form no-spinner'
                            value={
                              stockOptions.find(
                                (stock) =>
                                  stock.id === parseInt(watch('idEntrada'))
                              )?.precioVenta || ''
                            }
                            {...register('precio', {
                              required: false,
                              min: {
                                value: 0,
                                message: 'Ingrese números válidos',
                              },
                              valueAsNumber: true,
                            })}
                          />
                          <span className='message'>
                            {errors?.precio?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            type='number'
                            className='input__form no-spinner'
                            defaultValue={0}
                            {...register('descuento', {
                              required: false,
                              min: {
                                value: 0,
                                message: 'Ingrese numeros validos',
                              },
                              max: {
                                value: 100,
                                message: 'Ingrese numeros validos',
                              },
                              valueAsNumber: true,
                            })}
                          />
                          <span className='message'>
                            {errors?.descuento?.message}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div>
                          <input
                            value={calculateTotal}
                            disabled
                            type='number'
                            className='input__form no-spinner'
                            {...register('total', {
                              required: false,
                              min: {
                                value: 0,
                                message: 'Ingrese numeros validos',
                              },
                              valueAsNumber: true,
                            })}
                          />
                          <span className='message'>
                            {errors?.total?.message}
                          </span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot className='py-2'>
                    <tr className='bg-purple-light text-white [&>td]:py-2 '>
                      <td>Total</td>
                      <td></td>
                      <td>Productos: {totales.totalProductos}</td>
                      <td colspan='2'>
                        Total sin descuento:{' '}
                        {totales.totalSinDescuento
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </td>
                      <td>
                        Total Descuento:{' '}
                        {(Math.floor(totales.totalDescuento * 100) / 100)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </td>
                      <td colspan='2'>
                        Total a Pagar:{' '}
                        {totales.totalPagar
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <button
                type='button'
                onClick={(e) => agregarDetalle(e)}
                className='bnt__primary mt-3'
              >
                Agregar
              </button>
            </section>
            <div className='flex gap-4 justify-center'>
              <button type='submit' className='bnt__primary mt-3'>
                Aceptar
              </button>
              <button
                onClick={() => {
                  reset()
                  SumarExistencias(), setDetalleFactura([]), onClose()
                }}
                className='bnt__danger mt-3 '
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default ModalRegisterFactura
