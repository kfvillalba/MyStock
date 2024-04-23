import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const ModalEditExistencias = ({ open, onClose, editar, dataExistencia }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://localhost:7073/inventario-service/Entradas/Actualizar?id=${dataExistencia.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        editar(data)
        onClose()
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Cliente editado con exito',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('Error al guardar al cliente')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar al cliente',
        text: error.message,
      })
    }
  }

  const [categoriasOptions, setCategoriasOptions] = useState([])
  const [productosOptions, setProductosOptions] = useState([])
  const [proveedoresOptions, setProveedoresOptions] = useState([])

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          'https://localhost:7127/api/Categorias/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          setCategoriasOptions(data)
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
          'https://localhost:7127/api/Proveerdors/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          setProveedoresOptions(data)
        } else {
          throw new Error('Error al cargar los proveedores')
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetchCategorias()
    fetchProveedores()
  }, [])

  const handleCategoriaChange = async (event) => {
    const idCategoria = event.target.value
    setProductosOptions([]) // Limpiar la lista de productos antes de hacer la consulta

    if (idCategoria !== '-1') {
      try {
        const response = await fetch(
          `https://localhost:7127/api/Productos/Filtrar/IdCategoria?idCategoria=${idCategoria}`
        )
        if (response.ok) {
          const data = await response.json()
          setProductosOptions(data)
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
        className='bg-white rounded-lg shadow-sm p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
          <h3>Editar Existencias</h3>
          <section className='flex flex-col gap-4 my-5'>
            <div className='flex flex-col'>
              <select
                type='text'
                className='select'
                {...register('idCategoria', {
                  min: { value: 0, message: 'Seleccione una Categoria' },
                })}
                onChange={handleCategoriaChange}
              >
                <option value='-1'>Seleccione una categoria</option>
                {categoriasOptions.map((categoria) => {
                  return (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  )
                })}
              </select>
              <span className='message'>{errors?.idCategoria?.message}</span>
            </div>
            <div className='flex flex-col'>
              <select
                type='text'
                className='select'
                {...register('idProducto', {
                  min: { value: 0, message: 'Seleccione un Producto' },
                })}
              >
                <option value='-1'>Seleccione un Producto</option>
                {productosOptions.map((producto) => {
                  return (
                    <option key={producto.id} value={producto.id}>
                      {producto.nombre}
                    </option>
                  )
                })}
              </select>
              <span className='message'>{errors?.idProducto?.message}</span>
            </div>
            <div className='flex flex-col'>
              <select
                type='text'
                className='select'
                {...register('idProveedor', {
                  min: { value: 0, message: 'Seleccione un Proveedor' },
                })}
              >
                <option value='-1'>Seleccione un Proveedor</option>
                {proveedoresOptions.map((proveedor) => {
                  return (
                    <option key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre}
                    </option>
                  )
                })}
              </select>
              <span className='message'>{errors?.idProveedor?.message}</span>
            </div>
            <div>
              <input
                defaultValue={`${dataExistencia.precioVenta}`}
                placeholder='Precio de Venta'
                type='number'
                className='input__form'
                {...register('precioVenta', {
                  required: {
                    value: true,
                    message: 'El Precio de Venta es obligatorio',
                  },
                  min: { value: true, message: 'Ingrese numeros validos' },
                  valueAsNumber: { value: true },
                })}
              />
              <span className='message'>{errors?.precioVenta?.message}</span>
            </div>
            <div>
              <input
                defaultValue={dataExistencia.precioCompra}
                placeholder='Precio de Compra'
                type='number'
                className='input__form'
                {...register('precioCompra', {
                  required: {
                    value: true,
                    message: 'El Precio de Compra es obligatorio',
                  },
                  min: { value: true, message: 'Ingrese numeros validos' },
                  valueAsNumber: { value: true },
                })}
              />
              <span className='message'>{errors?.precioCompra?.message}</span>
            </div>
            <div>
              <input
                defaultValue={`${dataExistencia.existenciaInicial}`}
                placeholder='Cantidad'
                type='number'
                className='input__form'
                {...register('cantidad', {
                  required: {
                    value: true,
                    message: 'La cantidad es obligatoria',
                  },
                  min: { value: true, message: 'Ingrese numeros validos' },
                  valueAsNumber: { value: true },
                })}
              />
              <span className='message'>{errors?.cantidad?.message}</span>
            </div>
            <div>
              <input
                defaultValue={`${dataExistencia.nota}`}
                id='nota'
                type='text'
                placeholder='Nota'
                className='input__form'
                {...register('nota', {
                  required: {
                    value: true,
                    message: 'La nota es obligatoria',
                  },
                })}
              />
              <span className='message'>{errors?.nota?.message}</span>
            </div>
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

export default ModalEditExistencias
