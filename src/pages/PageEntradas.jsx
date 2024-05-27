import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import Swal from 'sweetalert2'
import ModalRegisterExistencias from '../components/Entradas/ModalRegisterExistencias'
import ModalEditExistencias from '../components/Entradas/ModalEditExistencias'
import {
  fetchExistencias,
  deleteExistencia,
  fetchProducts,
  fetchCategories,
  fetchProviders,
} from '../components/Fetchs/API_INV'

const Page = () => {
  const [existencia, setExistencia] = useState([])
  const [categorias, setCategorias] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('')
  const [buscarProducto, setBuscarProducto] = useState('')
  const [proveedorSeleccionado, setproveedorSeleccionado] = useState('')

  const [formRegister, setFormRegister] = useState(false)
  const [formEdit, setFormEdit] = useState(false)

  const [dataExistencia, setDataExistencia] = useState({
    id: '',
    idCategoria: '',
    idProducto: '',
    idProveedor: '',
    precioCompra: '',
    precioVenta: '',
    existenciaInicial: '',
    nota: '',
  })

  useEffect(() => {
    fetchExistencias()
      .then((existencia) => {
        setExistencia(existencia)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las existencias', 'error')
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchCategories()
      .then((existencia) => {
        setCategorias(existencia)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las existencias', 'error')
        setIsLoading(false)
      })
  }, [])

  useEffect(() => {
    fetchProviders()
      .then((existencia) => {
        setProveedores(existencia)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las existencias', 'error')
        setIsLoading(false)
      })
  }, [])

  const eliminarExistencia = async (idExistencia) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer este cambio',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteExistencia(idExistencia)
          fetchExistencias().then((existencia) => setExistencia(existencia))
          setExistencia(existencia.filter((ex) => ex.id !== idExistencia))
          Swal.fire('Éxito', 'Existencia eliminada correctamente', 'success')
        } catch (error) {
          console.error(error)
          Swal.fire('Error', 'Hubo un error al eliminar la existencia', 'error')
        }
      }
    })
  }

  const editarExistencia = (
    event,
    id,
    idCategoria,
    idProducto,
    idProveedor,
    precioCompra,
    precioVenta,
    existenciaInicial,
    nota
  ) => {
    event.preventDefault()
    setDataExistencia({
      id,
      idCategoria,
      idProducto,
      idProveedor,
      precioCompra,
      precioVenta,
      existenciaInicial,
      nota,
    })
    setFormEdit(true)
  }

  const handleBuscarProducto = (event) => {
    setBuscarProducto(event.target.value)
  }

  return (
    <>
      <ModalRegisterExistencias
        open={formRegister}
        onClose={() => {
          setFormRegister(false)
          fetchExistencias().then((existencia) => setExistencia(existencia))
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
        }}
      />
      {formEdit && (
        <ModalEditExistencias
          open={formEdit}
          dataExistencia={dataExistencia}
          onClose={() => {
            console.log(dataExistencia)
            setFormEdit(false)
          }}
          editar={(dataForm) => {
            console.log(dataForm)
          }}
        />
      )}
      <div className='p-5 flex flex-col shadow-md rounded-sm shadow-black h-full'>
        <section className='flex row-span-3 flex-wrap justify-between gap-4 '>
          <div>
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
          <div>
            <input
              className='input__form'
              id='textBuscarProducto'
              type='text'
              placeholder='Buscar Producto'
              value={buscarProducto}
              onChange={handleBuscarProducto}
            />
          </div>
          <div>
            <select
              type='text'
              className='select'
              value={proveedorSeleccionado}
              onChange={(e) => setproveedorSeleccionado(e.target.value)}
            >
              <option value='-1'>Todos los Proveedores</option>
              {proveedores &&
                proveedores.map((proveedor) => {
                  return (
                    <option key={proveedor.id} value={`${proveedor.id}`}>
                      {proveedor.nombre}
                    </option>
                  )
                })}
            </select>
          </div>
        </section>
        <div className='container__table'>
          <div className='table-wrapper h-96'>
            <table className='w-full table-auto'>
              <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                <tr>
                  <th className='text-start pl-3'>Categoria</th>
                  <th className='text-start pl-3'>Producto</th>
                  <th className='text-start pl-3'>Proveedor</th>
                  <th className='text-center'>Existencia Inicial</th>
                  <th className='text-center'>Existencia Actual</th>
                  <th className='text-center'>Precio de Compra</th>
                  <th className='text-center'>Precio de Venta</th>
                  <th className='text-center'>Fecha de Entrada</th>
                  <th className='text-center'>Nota</th>
                  <th className='text-center'>Editar</th>
                  <th className='text-center'>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {' '}
                {isLoading ? (
                  <tr>
                    <td colSpan='9' className='text-center py-4'>
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
                  existencia
                    .filter((categoria) =>
                      categoriaSeleccionada
                        ? parseInt(categoria.idCategoria) ===
                          parseInt(categoriaSeleccionada)
                        : true
                    )
                    .filter((producto) =>
                      producto.nombreProducto
                        .toLowerCase()
                        .includes(buscarProducto.toLowerCase())
                    )
                    .filter((proveedor) =>
                      proveedorSeleccionado
                        ? parseInt(proveedor.idProveedor) ===
                          parseInt(proveedorSeleccionado)
                        : true
                    )
                    .map((existencia, index) => (
                      <tr
                        className={`even:bg-slate-100 ${
                          existencia.existenciaActual === 0
                            ? 'row-strike-through'
                            : ''
                        }`}
                        key={index}
                      >
                        <td className='pl-3'>{existencia.nombreCategoria}</td>
                        <td className='pl-3'>{existencia.nombreProducto}</td>
                        <td className='pl-3'>{existencia.nombreProveedor}</td>
                        <td className='text-center'>
                          {existencia.existenciaInicial}
                        </td>
                        <td className='text-center'>
                          {existencia.existenciaActual}
                        </td>
                        <td className='text-center'>
                          {existencia.precioCompra}
                        </td>
                        <td className='text-center'>
                          {existencia.precioVenta}
                        </td>
                        <td className='text-center pl-1'>
                          {existencia.fechaEntrada}
                        </td>
                        <td className='text-start pl-5'>{existencia.nota}</td>
                        <td className='text-center text-blue-800'>
                          <button
                            onClick={(event) =>
                              editarExistencia(
                                event,
                                existencia.id,
                                existencia.nombreCategoria,
                                existencia.nombreProducto,
                                existencia.nombreProveedor,
                                existencia.precioCompra,
                                existencia.precioVenta,
                                existencia.existenciaInicial,
                                existencia.nota
                              )
                            }
                          >
                            <EditIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td className='text-center text-red-800'>
                          <button
                            onClick={() => eliminarExistencia(existencia.id)}
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
        </div>{' '}
        <section className='self-end mt-2'>
          <button
            onClick={() => setFormRegister(true)}
            className='bnt__primary'
          >
            Agregar Existencia
          </button>
        </section>
      </div>
    </>
  )
}
const Pageexistencia = () => {
  return <PanelDivisor Page={<Page />} />
}

export default Pageexistencia
