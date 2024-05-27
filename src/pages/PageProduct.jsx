import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import ModalRegisterProducto from '../components/Productos/ModalRegisterProducto'
import Swal from 'sweetalert2'
import ModalEditProducto from '../components/Productos/ModalEditProducto'
import {
  fetchProducts,
  fetchCategories,
  deleteProduct,
} from '../components/Fetchs/API_INV'

const Page = () => {
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState()
  const [buscarProducto, setBuscarProducto] = useState('')
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
      .then((productos) => {
        setProductos(productos)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        Swal.fire('Eror', 'Hubo un error al obtener los clientes', 'error')
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchCategories()
      .then((categorias) => setCategorias(categorias))
      .catch((error) => console.error('Error fetching categories:', error))
  }, [])

  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  const [dataProducto, setDataProducto] = useState({
    id: '',
    nombre: '',
    descripcion: '',
    idCategoria: '',
  })

  const eliminarProducto = async (event, id) => {
    event.preventDefault()
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'No podra deshacer este cambio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Bórralo!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct(id)
          fetchProducts().then((productos) => setProductos(productos))
          Swal.fire({
            title: 'Borrado!',
            text: 'Se ha borrado con éxito',
            icon: 'success',
          })
        } catch (error) {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error al borrar el producto',
            text: error.message,
          })
        }
      }
    })
  }

  const editarProducto = (event, id, nombre, descripcion, idCategoria) => {
    event.preventDefault()
    setDataProducto({ id, nombre, descripcion, idCategoria })
    setformEdit(true)
  }

  const handleBuscarProducto = (event) => {
    setBuscarProducto(event.target.value)
  }

  return (
    <>
      <ModalRegisterProducto
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          fetchProducts().then((productos) => setProductos(productos))
        }}
        categorias={categorias}
      />
      <ModalEditProducto
        open={formEdit}
        dataProducto={dataProducto}
        onClose={() => {
          setformEdit(false)
        }}
        editar={(dataForm) => {
          console.log(dataForm)
          //con esta dataForm modifican
        }}
        categorias={categorias}
      />
      <div className='p-5 flex flex-col  shadow-md rounded-sm shadow-black h-full'>
        <section className='flex gap-10'>
          <div className='flex flex-col'>
            <label className='label__form' htmlFor='textBuscarProducto'>
              Buscar Producto
            </label>
            <input
              className='input__form'
              id='textBuscarProducto'
              type='text'
              value={buscarProducto}
              onChange={handleBuscarProducto}
            />
          </div>
          <div>
            <div className='flex flex-col'>
              <label className='label__form' htmlFor='selectCategoria'>
                Filtar Categoría
              </label>
              <select
                className='select'
                id='selectCategoria'
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option value=''>Todas las Categorías</option>
                {categorias &&
                  categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </section>

        <div className='container__table'>
          <div className='table-wrapper h-96'>
            <table className='w-full '>
              <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                <tr>
                  <th className='text-start pl-3'>Categoria</th>
                  <th className='text-start pl-3'>Nombre</th>
                  <th className='text-start pl-3'>Descripcion</th>
                  <th className='text-center w-28'>Editar</th>
                  <th className='text-center w-28'>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan='5' className='text-center py-4'>
                      <div className='flex items-center justify-center'>
                        <svg
                          className='animate-spin h-8 w-8 mr-3 text-blue-900'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            cx='12'
                            cy='12'
                            r='10'
                            fill='none'
                            strokeWidth='2'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeDasharray='31.415, 31.415'
                            transform='rotate(96 12 12)'
                          >
                            <animateTransform
                              attributeName='transform'
                              type='rotate'
                              from='0 12 12'
                              to='360 12 12'
                              dur='1s'
                              repeatCount='indefinite'
                            />
                          </circle>
                        </svg>
                        <span className='text-lg font-bold text-gray-900'>
                          Cargando...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  productos
                    .filter((producto) =>
                      producto.nombre
                        .toLowerCase()
                        .includes(buscarProducto.toLowerCase())
                    )
                    .filter((producto) =>
                      categoriaSeleccionada
                        ? parseInt(producto.idCategoria) ===
                          parseInt(categoriaSeleccionada)
                        : true
                    )
                    .map((producto, index) => (
                      <tr className='even:bg-slate-100' key={index}>
                        <td className='pl-3'>{producto.nombreCategoria}</td>
                        <td className='pl-3'>{producto.nombre}</td>
                        <td className='pl-3'>{producto.descripcion}</td>
                        <td className='text-center text-blue-800'>
                          <button
                            onClick={(event) =>
                              editarProducto(
                                event,
                                producto.id,
                                producto.nombre,
                                producto.descripcion,
                                producto.idCategoria
                              )
                            }
                          >
                            <EditIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td className='text-center text-red-800'>
                          <button
                            onClick={(event) =>
                              eliminarProducto(event, producto.id)
                            }
                          >
                            <DeleteIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <section className='self-end mt-2'>
          <button
            onClick={() => setformRegister(true)}
            className='bnt__primary'
          >
            Agregar Productos
          </button>
        </section>
      </div>
    </>
  )
}

const PageProduct = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageProduct
