import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EyeIcon from '../assets/verIcon'
import Swal from 'sweetalert2'
import ModalRegisterFactura from '../components/Facturación/ModalRegisterFactura'
import ModalEditFactura from '../components/Facturación/ModalEditFactura'
import { fetchSalidas } from '../components/Fetchs/API_INV'
import ModalVerFactura from '../components/Facturación/ModalVerFactura'

const Page = () => {
  const [salidas, setSalidas] = useState([])
  const [formRegister, setformRegister] = useState(false)
  const [formView, setFormView] = useState(false)
  const [formEdit, setformEdit] = useState(false)
  const [selectedSalida, setSelectedSalida] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [buscarCliente, setBuscarCliente] = useState('')
  const [numeroFactura, setNumeroFactura] = useState('')

  useEffect(() => {
    fetchSalidas()
      .then((salida) => {
        setSalidas(salida)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las salidas', 'error')
        setIsLoading(false)
      })
  }, [])

  const handleView = (salida) => {
    setSelectedSalida(salida)
    setFormView(true)
  }

  const handleBuscarCliente = (event) => {
    setBuscarCliente(event.target.value)
  }

  return (
    <>
      <ModalRegisterFactura
        open={formRegister}
        onClose={() => {
          setformRegister(false)
          fetchSalidas().then((salidas) => setSalidas(salidas))
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
        }}
      />
      <ModalVerFactura
        open={formView}
        onClose={() => {
          setFormView(false)
        }}
        salida={selectedSalida}
      />

      <ModalEditFactura
        open={formEdit}
        onClose={() => {
          setformEdit(false)
        }}
        editar={(dataForm) => {}}
      />

      <div className='p-5 flex flex-col  shadow-md rounded-sm shadow-black h-full'>
        <section className='flex row-span-3 flex-wrap justify-between gap-4'>
          <div>
            <input
              placeholder='Numero de factura'
              type='number'
              className='input__form'
              onChange={(event) => setNumeroFactura(event.target.value)}
            />
          </div>
          <div>
            <input
              className='input__form'
              id='textBuscarclientes'
              type='text'
              placeholder='Buscar cliente'
              value={buscarCliente}
              onChange={handleBuscarCliente}
            />
          </div>
        </section>

        <div className='container__table'>
          <div className='table-wrapper h-96'>
            <table className='w-full table-auto '>
              <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                <tr>
                  <th className='text-center'>Num Factura</th>
                  <th className='text-center'>Fecha</th>
                  <th className='text-center'>Cliente</th>
                  <th className='text-center'>Total Pagado</th>
                  <th className='text-center'>Mostrar</th>
                  <th className='text-center'>Eliminar</th>
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
                  salidas
                    .filter(
                      (salida) =>
                        salida.clienteNombre
                          .toLowerCase()
                          .includes(buscarCliente.toLowerCase()) &&
                        (!numeroFactura ||
                          salida.id === parseInt(numeroFactura))
                    )
                    .map((salida, index) => (
                      <tr className='text-center even:bg-slate-100' key={index}>
                        <td>{salida.id}</td>
                        <td>
                          {new Date(salida.fechaFactura).toLocaleString(
                            'es-ES',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          )}
                        </td>
                        <td>{salida.clienteNombre}</td>
                        <td>{salida.totalPagarConDescuento}</td>
                        <td className='text-blue-800'>
                          <button onClick={() => handleView(salida)}>
                            <EyeIcon clases={'size-7 cursor-pointer'} />
                          </button>
                        </td>
                        <td className=' text-red-800'>
                          <button onClick={(event) => console.log('event')}>
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
            Nueva Factura
          </button>
        </section>
      </div>
    </>
  )
}
const PageSalidas = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageSalidas
