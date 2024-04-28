import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import DeleteIcon from '../assets/DeleteIcon'

const ModalRegisterFactura = ({ open, onClose, registrar }) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const idCliente = parseInt(data.cliente)
      // const fechaFactura = new Date().toISOString()
      const cantidadProductos = detalleFactura.length
      const totalPagarSinDescuento = totales.totalSinDescuento
      const totalDescuento = totales.totalDescuento
      const totalPagarConDescuento = totales.totalPagar

      const productoSalidas = detalleFactura.map((detalle) => {
        console.log(detalle)
        return {
          idCategoria: parseInt(detalle.idCategoria),
          idProducto: parseInt(detalle.idProducto),
          precio: parseFloat(detalle.precio),
          cantidad: parseFloat(detalle.cantidad),
          descuento: parseFloat(detalle.descuento),
          valorDescuento: parseFloat(detalle.valorDescuento),
          total: parseFloat(detalle.total),
        }
      })

      const factura = {
        // fechaFactura,
        idCliente,
        cantidadProductos,
        totalPagarConDescuento,
        totalPagarSinDescuento,
        totalDescuento,
        productoSalidas,
      }
      console.log(factura)

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
      Swal.fire(
        'Error',
        'Ha ocurrido un error al registrar la factura',
        'error'
      )
    }
  }

  const total = [
    (
      Math.floor(
        parseFloat(
          watch('cantidad') * watch('precio') -
            (watch('cantidad') * watch('precio') * watch('descuento')) / 100
        ) * 100
      ) / 100
    ).toFixed(2),
  ]
  const totales = {}
  const [detalleFactura, setDetalleFactura] = useState([])
  function getTotales() {
    totales.totalProductos = 0
    totales.totalSinDescuento = 0
    totales.totalDescuento = 0
    totales.totalPagar = 0
    detalleFactura.map((detalle) => {
      totales.totalProductos += parseFloat(detalle.cantidad)
      totales.totalSinDescuento += parseFloat(detalle.cantidad * detalle.precio)
      totales.totalDescuento += parseFloat(detalle.valorDescuento)
      totales.totalPagar += parseFloat(detalle.total)
    })
  }
  getTotales()
  const agregarDetalle = (e) => {
    e.preventDefault()

    const categoriaSeleccionada = categoriasOptions.find(
      (categoria) => categoria.idCategoria === parseInt(watch('categoria'))
    )
    const productoSeleccionado = productosOptions.find(
      (producto) => producto.idProducto === parseInt(watch('producto'))
    )
    const detalle = {
      categoria: categoriaSeleccionada
        ? categoriaSeleccionada.nombreCategoria
        : '',
      producto: productoSeleccionado ? productoSeleccionado.nombreProducto : '',
      idCategoria: categoriaSeleccionada
        ? categoriaSeleccionada.idCategoria
        : 0, // Reemplazar con el valor adecuado si no se encuentra
      idProducto: productoSeleccionado ? productoSeleccionado.idProducto : 0, // Reemplazar con el valor adecuado si no se encuentra
      cantidad: parseFloat(watch('cantidad')),
      precio: parseFloat(watch('precio')),
      descuento: parseFloat(watch('descuento')),
      valorDescuento: parseFloat(
        (watch('cantidad') * watch('precio') * watch('descuento')) / 100
      ).toFixed(2),
      total: total[0],
    }
    setDetalleFactura([...detalleFactura, detalle])
    reset()
  }

  const [categoriasOptions, setCategoriasOptions] = useState([])
  const [productosOptions, setProductosOptions] = useState([])
  const [clientesOptions, setClientesOptions] = useState([])

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Clientes/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          setClientesOptions(data)
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

  const handleCategoriaChange = async (event) => {
    const idCategoria = event.target.value
    setProductosOptions([]) // Limpiar la lista de productos antes de hacer la consulta

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

  if (!open) return null
  return (
    <div className='fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50'>
      <form
        className='bg-white rounded-lg shadow-sm p-5 w-full mx-32'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
          <h3>Nueva Factura</h3>
          <section className='flex flex-col gap-4 my-5'>
            <div className='flex flex-col'>
              <select
                type='text'
                className='select'
                {...register('cliente', {
                  min: { value: 0, message: 'Seleccione un Cliente' },
                })}
              >
                <option value='-1'>Seleccione un Cliente</option>
                {clientesOptions?.map((cliente) => {
                  return (
                    <option key={cliente.id} value={`${cliente.id}`}>
                      {cliente.nombre}
                    </option>
                  )
                })}
              </select>
              <span className='message'>{errors?.cliente?.message}</span>
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
                      <tr className='even:bg-slate-100' key={index}>
                        <td className='text-center text-red-800'>
                          <button onClick={(event) => console.log('event')}>
                            <DeleteIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td>{detalle.categoria}</td>
                        <td>{detalle.producto}</td>
                        <td>{detalle.stock}</td>
                        <td>{detalle.cantidad}</td>
                        <td>{detalle.precio}</td>
                        <td>{detalle.descuento}</td>
                        <td>{detalle.total}</td>
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
                          {errors?.categoria?.message}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className='flex flex-col'>
                        <select
                          type='text'
                          className='select__table'
                          {...register('stock')}
                        >
                          <option value='-1'>Seleccione el stock</option>
                          {productosOptions?.map((producto) => {
                            return (
                              <option
                                key={producto.idProductos}
                                value={`${producto.idProductos}`}
                              >
                                {producto.nombreProducto}
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
                      <div>
                        <input
                          type='number'
                          className='input__form'
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
                          className='input__form'
                          {...register('precio', {
                            required: false,
                            min: {
                              value: 0,
                              message: 'Ingrese numeros validos',
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
                          className='input__form'
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
                          placeholder={total}
                          disabled
                          type='number'
                          className='input__form'
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
                    <td></td>
                    <td></td>
                    <td>Productos: {totales.totalProductos}</td>
                    <td>
                      Total sin descuento:{' '}
                      {(
                        Math.floor(totales.totalSinDescuento * 100) / 100
                      ).toFixed(2)}
                    </td>
                    <td>
                      Total Descuento:{' '}
                      {(Math.floor(totales.totalDescuento * 100) / 100).toFixed(
                        2
                      )}
                    </td>
                    <td>
                      Total a Pagar:{' '}
                      {(Math.floor(totales.totalPagar * 100) / 100).toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <button
              onClick={(e) => agregarDetalle(e)}
              className='bnt__primary mt-3'
            >
              Agregar Otro
            </button>
          </section>
          <div className='flex gap-4 justify-center'>
            <button type='submit' className='bnt__primary mt-3'>
              Aceptar
            </button>
            <button
              onClick={() => {
                reset(), onClose()
              }}
              className='bnt__danger mt-3 '
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default ModalRegisterFactura
