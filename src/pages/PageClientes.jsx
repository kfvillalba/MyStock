import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import ModalRegisterClientes from '../components/Clientes/ModalRegisterClientes'
import ModalEditClientes from '../components/Clientes/ModalEditClientes'
import Swal from 'sweetalert2'
import { fetchClients, deleteClient } from '../components/Fetchs/API_INV'

const Page = () => {
  const [clientes, setClientes] = useState([])
  const [buscarCliente, setBuscarCliente] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  const [dataCliente, setDataCliente] = useState({
    id: '',
    nombre: '',
    celular: '',
    correo: '',
  })

  useEffect(() => {
    fetchClients()
      .then((clientes) => {
        setClientes(clientes)
        setIsLoading(false)
      })
      .catch((error) => {
        console.log(error)
        Swal.fire('Eror', 'Hubo un error al obtener los clientes', 'error')
        setIsLoading(false)
      })
  }, [])

  const eliminarCliente = async (event, id) => {
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
          await deleteClient(id)
          fetchClients().then((clientes) => setClientes(clientes))
          Swal.fire({
            title: 'Borrado!',
            text: 'Se ha borrado con éxito',
            icon: 'success',
          })
        } catch (error) {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error al borrar el cliente',
            text: error.message,
          })
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    })
  }

  const editarCliente = (event, id, nombre, celular, correo) => {
    event.preventDefault()
    setDataCliente({ id, nombre, celular, correo })
    setformEdit(true)
  }

  const handleBuscarCliente = (event) => {
    setBuscarCliente(event.target.value)
  }

  return (
    <>
      <ModalRegisterClientes
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          fetchClients().then((clientes) => setClientes(clientes))
        }}
      />
      {
        <ModalEditClientes
          open={formEdit}
          dataCliente={dataCliente}
          onClose={() => {
            setformEdit(false)
          }}
          editar={(dataForm) => {
            console.log(dataForm)
          }}
        />
      }
      <div className='p-5 flex flex-col shadow-md  shadow-black h-full'>
        <section className='flex flex-col'>
          <label className='label__form' htmlFor='textBuscarclientes'>
            Buscar clientes
          </label>
          <input
            className='input__form'
            id='textBuscarclientes'
            type='text'
            value={buscarCliente}
            onChange={handleBuscarCliente}
          />
        </section>

        <div className='container__table'>
          <div className='table-wrapper h-96'>
            <table className='w-full '>
              <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                <tr>
                  <th className='text-start pl-3'>Nombre</th>
                  <th className='text-start pl-3'>Celular</th>
                  <th className='text-start pl-3'>Correo</th>
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
                  clientes
                    .filter((cliente) =>
                      cliente.nombre
                        .toLowerCase()
                        .includes(buscarCliente.toLowerCase())
                    )
                    .map((cliente, index) => (
                      <tr className='even:bg-slate-100' key={index}>
                        <td className='pl-3'>{cliente.nombre}</td>
                        <td className='pl-3'>{cliente.celular}</td>
                        <td className='pl-3'>{cliente.correo}</td>
                        <td className='text-center text-blue-800'>
                          <button
                            onClick={(event) =>
                              editarCliente(
                                event,
                                cliente.id,
                                cliente.nombre,
                                cliente.celular,
                                cliente.correo
                              )
                            }
                          >
                            <EditIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td className='text-center text-red-800'>
                          <button
                            onClick={(event) =>
                              eliminarCliente(event, cliente.id)
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
            Agregar clientes
          </button>
        </section>
      </div>
    </>
  )
}

const Pageclientes = () => {
  return <PanelDivisor Page={<Page />} />
}

export default Pageclientes
