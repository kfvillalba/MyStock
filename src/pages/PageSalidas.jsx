import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import Swal from 'sweetalert2'
import ModalRegisterFactura from '../components/ModalRegisterFactura'
import ModalEditFactura from '../components/ModalEditFactura'
import { fetchSalidas } from '../components/API_INV'

const Page = () => {
  const [salidas, setSalidas] = useState([])

  useEffect(() => {
    fetchSalidas()
      .then((data) => setSalidas(data))
      .catch((error) => {
        console.error(error)
        Swal.fire('Error', 'Hubo un error al obtener las salidas', 'error')
      })
  }, [])

  const [clientes, setClientes] = useState()
  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  return (
    <>
      <ModalRegisterFactura
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          console.log(dataForm)
          setExistencia([...existencia, dataForm])
        }}
      />
      {
        <ModalEditFactura
          open={formEdit}
          onClose={() => {
            setformEdit(false)
          }}
          editar={(dataForm) => {}}
        />
      }
      <div className='p-5  shadow-md rounded-sm shadow-black h-full'>
        <h3 className='mb-2'>Lista Facturas</h3>
        <section>
          <button
            onClick={() => setformRegister(true)}
            className='bnt__primary'
            class='bnt__primary transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...'
          >
            Nueva Factura
          </button>
        </section>

        <section className='flex row-span-3 flex-wrap justify-between gap-4 my-5'>
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

        <div className='h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm'>
          <table className='w-full table-auto '>
            <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
              <tr>
                <th className='text-start pl-3'>Num Factura</th>
                <th className='text-start pl-3'>Fecha</th>
                <th className='text-start pl-3'>Cliente</th>
                <th className='text-center'>Total Pagado</th>
                <th className='text-center'>Editar</th>
                <th className='text-center'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {salidas?.map((salida, index) => {
                return (
                  <tr className='even:bg-slate-100' key={index}>
                    <td className='pl-3'>{salida.id}</td>
                    <td>{salida.fechaFactura}</td>
                    <td>{salida.clienteNombre}</td>
                    <td>{salida.totalPagarConDescuento}</td>
                    <td className='text-center text-blue-800'>
                      <button onClick={(event) => setformEdit(true)}>
                        <EditIcon clases={'size-7 cursor-pointer'} />
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
      </div>
    </>
  )
}
const PageSalidas = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageSalidas
