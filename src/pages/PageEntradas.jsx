import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import Swal from 'sweetalert2'
import ModalRegisterExistencias from '../components/ModalRegisterExistencias'
import ModalEditExistencias from '../components/ModalEditExistencias'
import { fetchExistencias, deleteExistencia } from '../components/API_INV'

const Page = () => {
  const [existencia, setExistencia] = useState([])
  const [categorias, setCategorias] = useState([])
  const [productos, setProductos] = useState([])
  const [proveedores, setProveedores] = useState([])

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
      .then((existencia) => setExistencia(existencia))
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las existencias', 'error')
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

  return (
    <>
      <ModalRegisterExistencias
        open={formRegister}
        onClose={() => {
          setFormRegister(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          fetchExistencias().then((existencia) => setExistencia(existencia))
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
      <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
        <h3 className='mb-2'>Lista existencia</h3>
        <section>
          <button
            onClick={() => setFormRegister(true)}
            className='bnt__primary'
            class='bnt__primary transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...'
          >
            Agregar Existencia
          </button>
        </section>

        <section className='flex row-span-3 flex-wrap justify-between gap-4 my-5'>
          <div>
            <select type='text' className='select'>
              <option value='-1'>Todas las Categorias</option>
              {categorias?.map((categoria) => {
                return (
                  <option key={categoria.id} value={`${categoria.id}`}>
                    {categoria.nombre}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <select type='text' className='select'>
              <option value='-1'>Todos los Productos</option>
              {productos?.map((producto) => {
                return (
                  <option key={producto.id} value={`${producto.id}`}>
                    {producto.nombre}
                  </option>
                )
              })}
            </select>
          </div>
          <div>
            <select type='text' className='select'>
              <option value='-1'>Todos los Proveedores</option>
              {proveedores?.map((proveedor) => {
                return (
                  <option key={proveedor.id} value={`${proveedor.id}`}>
                    {proveedor.nombre}
                  </option>
                )
              })}
            </select>
          </div>
        </section>

        <div className='h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm'>
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
              {existencia?.map((existencia, index) => {
                return (
                  <tr className='even:bg-slate-100' key={index}>
                    <td className='pl-3'>{existencia.nombreCategoria}</td>
                    <td className='pl-3'>{existencia.nombreProducto}</td>
                    <td className='pl-3'>{existencia.nombreProveedor}</td>
                    <td className='pl-3'>{existencia.existenciaInicial}</td>
                    <td className='pl-3'>{existencia.existenciaActual}</td>
                    <td className='pl-3'>{existencia.precioCompra}</td>
                    <td className='pl-3'>{existencia.precioVenta}</td>
                    <td className='pl-3'>{existencia.fechaEntrada}</td>
                    <td className='pl-3'>{existencia.nota}</td>
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
                      <button onClick={() => eliminarExistencia(existencia.id)}>
                        <DeleteIcon clases={'size-7 cursor-pointer'} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
const Pageexistencia = () => {
  return <PanelDivisor Page={<Page />} />
}

export default Pageexistencia
