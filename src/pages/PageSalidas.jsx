import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EyeIcon from '../assets/verIcon'
import Swal from 'sweetalert2'
import ModalRegisterFactura from '../components/ModalRegisterFactura'
import ModalEditFactura from '../components/ModalEditFactura'
import { fetchSalidas } from '../components/API_INV'
import ModalVerFactura from '../components/ModalVerFactura'

const Page = () => {
  const [salidas, setSalidas] = useState([])
  const [clientes, setClientes] = useState()
  const [formRegister, setformRegister] = useState(false)
  const [formView, setFormView] = useState(false)
  const [formEdit, setformEdit] = useState(false)
  const [selectedSalida, setSelectedSalida] = useState(null)

  useEffect(() => {
    fetchSalidas()
      .then((data) => setSalidas(data))
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las salidas', 'error')
      })
  }, [])

  const handleView = (salida) => {
    setSelectedSalida(salida)
    setFormView(true)
  }

  return (
    <>
      <ModalRegisterFactura
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          fetchSalidas().then((salidas) => setSalidas(salidas))
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
            />
          </div>
          <div>
            <select type='text' className='select'>
              <option value='-1'>Todos los Clientes</option>
              {clientes?.map((cliente) => {
                return (
                  <option key={cliente.id} value={`${cliente.id}`}>
                    {cliente.nombre}
                  </option>
                )
              })}
            </select>
          </div>
        </section>

        <div className='container__table'>
          <table className='w-full table-auto '>
            <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
              <tr>
                <th className='text-start pl-3'>Num Factura</th>
                <th className='text-start pl-20'>Fecha</th>
                <th className='text-start pl-3'>Cliente</th>
                <th className='text-start'>Total Pagado</th>
                <th className='text-center'>Mostrar</th>
                <th className='text-center'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {salidas?.map((salida, index) => {
                return (
                  <tr className='even:bg-slate-100' key={index}>
                    <td className='text-start pl-14'>{salida.id}</td>
                    <td>
                      {new Date(salida.fechaFactura).toLocaleString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </td>
                    <td>{salida.clienteNombre}</td>
                    <td className='text-start pl-5'>
                      {salida.totalPagarConDescuento}
                    </td>
                    <td className='text-center text-blue-800'>
                      <button onClick={() => handleView(salida)}>
                        <EyeIcon clases={'size-7 cursor-pointer'} />
                      </button>
                    </td>
                    <td className='text-center text-red-800'>
                      <button onClick={(event) => console.log('event')}>
                        <DeleteIcon clases={'size-7 cursor-pointer'} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
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
