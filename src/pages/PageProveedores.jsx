import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import ModalRegisterProveedores from '../components/Proveedores/ModalRegisterProveedores'
import ModalEditProveedores from '../components/Proveedores/ModalEditProveedores'
import Swal from 'sweetalert2'
import { fetchProviders, deleteProvider } from '../components/Fetchs/API_INV'

const Page = () => {
  const [proveedores, setProveedores] = useState([])
  const [buscarProveedor, setBuscarProveedor] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchProviders()
      .then((proveedores) => {
        setProveedores(proveedores)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        Swal.fire('Eror', 'Hubo un error al obtener los proveedores', 'error')
        setIsLoading(false)
      })
  }, [])

  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  const [dataProveedor, setDataProveedor] = useState({
    id: '',
    nombre: '',
    celular: '',
    correo: '',
  })

  const eliminarProveedores = async (event, id) => {
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
          await deleteProvider(id)
          fetchProviders().then((proveedor) => setProveedores(proveedor))
          Swal.fire({
            title: 'Borrado!',
            text: 'Se ha borrado con éxito',
            icon: 'success',
          })
        } catch (error) {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error al borrar el proveedor',
            text: error.message,
          })
        }
      }
    })
  }

  const editarProveedor = (event, id, nombre, celular, correo) => {
    event.preventDefault()
    setDataProveedor({ id, nombre, celular, correo })
    setformEdit(true)
  }

  const handleBuscarProveedor = (event) => {
    setBuscarProveedor(event.target.value)
  }

  return (
    <>
      <ModalRegisterProveedores
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          fetchProviders().then((proveedor) => setProveedores(proveedor))
        }}
      />
      {
        <ModalEditProveedores
          open={formEdit}
          dataProveedor={dataProveedor}
          onClose={() => {
            setformEdit(false)
          }}
          editar={(dataForm) => {
            console.log(dataForm)
            fetchProviders().then((proveedor) => setProveedores(proveedor))
          }}
        />
      }
      <div className='p-5 flex flex-col  shadow-md rounded-sm shadow-black h-full'>
        <section className='flex flex-col '>
          <label className='label__form' htmlFor='textBuscarProveedores'>
            Buscar Proveedores
          </label>
          <input
            className='input__form'
            id='textBuscarProveedores'
            type='text'
            value={buscarProveedor}
            onChange={handleBuscarProveedor}
          />
        </section>

        <div className='container__table'>
          <div className='table-wrapper h-96'>
            <table className='w-full '>
              <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                <tr>
                  <th className='text-start pl-3'>Nombre</th>
                  <th className='text-start pl-3'>Correo Electronico</th>
                  <th className='text-start pl-3'>Telefono</th>
                  <th className='text-start pl-3'>Direccion</th>
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
                  proveedores
                    .filter((proveedor) =>
                      proveedor.nombre
                        .toLowerCase()
                        .includes(buscarProveedor.toLowerCase())
                    )
                    .map((proveedor, index) => (
                      <tr className='even:bg-slate-100' key={index}>
                        <td className='pl-3'>{proveedor.nombre}</td>
                        <td className='pl-3'>{proveedor.correo}</td>
                        <td className='pl-3'>{proveedor.celular}</td>
                        <td className='pl-3'>{proveedor.direccion}</td>
                        <td className='text-center text-blue-800'>
                          <button
                            onClick={(event) =>
                              editarProveedor(
                                event,
                                proveedor.id,
                                proveedor.nombre,
                                proveedor.celular,
                                proveedor.correo
                              )
                            }
                          >
                            <EditIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td className='text-center text-red-800'>
                          <button
                            onClick={(event) =>
                              eliminarProveedores(event, proveedor.id)
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
            Agregar proveedores
          </button>
        </section>
      </div>
    </>
  )
}
const PageProveedores = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageProveedores
