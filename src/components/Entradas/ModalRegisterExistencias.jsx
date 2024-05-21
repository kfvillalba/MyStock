import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'
import { IoIosAddCircle } from 'react-icons/io'
import ModalRegisterCategoria from '../Categorias/ModalRegisterCategoria'
import ModalRegisterProducto from '../Productos/ModalRegisterProducto'
import ModalRegisterProveedores from '../Proveedores/ModalRegisterProveedores'
import {
  fetchCategories,
  fetchProducts,
  fetchProviders,
} from '../Fetchs/API_INV'

const ModalRegisterExistencias = ({ open, onClose }) => {
  const [categoriasOptions, setCategoriasOptions] = useState([])
  const [productosOptions, setProductosOptions] = useState([])
  const [proveedoresOptions, setProveedoresOptions] = useState([])
  const [categorias, setCategorias] = useState()

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Categorias/Consultar'
        )
        if (response.ok) {
          const data = await response.json()
          setCategorias(data)
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
          'https://localhost:7073/inventario-service/Proveedors/Consultar'
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    console.log(data)
    try {
      const response = await fetch(
        'https://localhost:7073/inventario-service/Entradas/Agregar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...data,
            idCategoria: parseInt(data.idCategoria),
            idProducto: parseInt(data.idProducto),
            idProveedor: parseInt(data.idProveedor),
          }),
        }
      )
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Existencia registrada correctamente',
        })
        reset()
        onClose()
      } else {
        throw new Error('Error al registrar la existencia')
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      })
    }
  }

  const handleCategoriaChange = async (event) => {
    const idCategoria = event.target.value
    setProductosOptions([])

    if (idCategoria !== '-1') {
      try {
        const response = await fetch(
          `https://localhost:7073/inventario-service/Productos/Filtrar/IdCategoria?idCategoria=${idCategoria}`
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

  const [formRegister1, setformRegister1] = useState(false)
  const [formRegister2, setformRegister2] = useState(false)
  const [formRegister3, setformRegister3] = useState(false)

  if (!open) return null
  return (
    <>
      <ModalRegisterCategoria
        open={formRegister1}
        onClose={() => {
          setformRegister1(false)
        }}
        registrar={(dataForm) => {
          fetchCategories().then((clientes) => setCategoriasOptions(clientes))
        }}
      />
      <ModalRegisterProducto
        open={formRegister2}
        onClose={() => {
          setformRegister2(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          fetchProducts().then((productos) => setProductosOptions(productos))
        }}
        categorias={categorias}
      />
      <ModalRegisterProveedores
        open={formRegister3}
        onClose={() => {
          setformRegister3(false)
        }}
        registrar={(dataForm) => {
          fetchProviders().then((clientes) => setProveedoresOptions(clientes))
        }}
      />
      <div className='fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50'>
        <form
          className='bg-white rounded-lg shadow-sm'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
            <h3 className='text-center'>Agregar existencias</h3>
            <section className='flex flex-col gap-4 my-5'>
              <div className='flex flex-col'>
                <div className='row '>
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

                  <button
                    type='button'
                    className='m-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none'
                    onClick={() => setformRegister1(true)}
                  >
                    <IoIosAddCircle className='text-gray-600' />
                  </button>
                </div>
                <span className='message'>{errors?.idCategoria?.message}</span>
              </div>
              <div className='flex flex-col'>
                <div className='row '>
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
                  <button
                    type='button'
                    className='m-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none'
                    onClick={() => setformRegister2(true)}
                  >
                    <IoIosAddCircle className='text-gray-600' />
                  </button>
                </div>
                <span className='message'>{errors?.idProducto?.message}</span>
              </div>
              <div className='flex flex-col'>
                <div className='row'>
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
                  <button
                    type='button'
                    className='m-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none'
                    onClick={() => {
                      setformRegister3(true)
                    }}
                  >
                    <IoIosAddCircle className='text-gray-600' />
                  </button>
                </div>
                <span className='message'>{errors?.idProveedor?.message}</span>
              </div>
              <div>
                <input
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
                  placeholder='Cantidad'
                  type='number'
                  className='input__form'
                  {...register('existenciaInicial', {
                    required: {
                      value: true,
                      message: 'La cantidad es obligatoria',
                    },
                    min: { value: true, message: 'Ingrese numeros validos' },
                    valueAsNumber: { value: true },
                  })}
                />
                <span className='message'>
                  {errors?.existenciaInicial?.message}
                </span>
              </div>
              <div>
                <input
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
    </>
  )
}

export default ModalRegisterExistencias
