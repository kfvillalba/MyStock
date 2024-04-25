import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import ModalRegisterCategoria from '../components/ModalRegisterCategoria'
import Swal from 'sweetalert2'
import ModalEditCategoria from '../components/ModalEditCategoria'
import { fetchCategories, deleteCategory } from '../components/API_INV'

const Page = () => {
  const [data, setData] = useState([])
  const [buscarCategoria, setBuscarCategoria] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        setData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching categories:', error)
        setIsLoading(false)
      })
  }, [])

  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  const [dataCategoria, setDataCategoria] = useState({ id: '', nombre: '' })

  const eliminarCategoria = async (event, id) => {
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
          await deleteCategory(id)
          fetchCategories().then((data) => setData(data))
          Swal.fire({
            title: 'Borrado!',
            text: 'Se ha borrado con éxito',
            icon: 'success',
          })
        } catch (error) {
          console.error(error)
          Swal.fire({
            icon: 'error',
            title: 'Error al borrar la categoría',
            text: error.message,
          })
        }
      }
    })
  }

  const editarCategoria = (event, id, nombre) => {
    event.preventDefault()
    setDataCategoria({ id, nombre })
    setformEdit(true)
  }

  const handleBuscarCategoria = (event) => {
    setBuscarCategoria(event.target.value)
  }

  return (
    <>
      <ModalRegisterCategoria
        open={formRegister}
        onClose={() => {
          setformRegister(false)
        }}
        registrar={(dataForm) => {
          fetchCategories().then((data) => setData(data))
        }}
      />
      <ModalEditCategoria
        open={formEdit}
        dataCategoria={dataCategoria}
        onClose={() => {
          setformEdit(false)
        }}
        editar={(dataForm) => {
          console.log(dataForm)
          //con esta dataForm modifican
        }}
      />
      <div className='p-5  shadow-md rounded-sm shadow-black h-full'>
        <h3 className='mb-2'>Lista Categorias</h3>
        <section>
          <button
            onClick={() => setformRegister(true)}
            className='bnt__primary'
            class='bnt__primary transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 ...'
          >
            Agregar Categoria
          </button>
        </section>

        <section className='flex flex-col my-5'>
          <label className='label__form' htmlFor='textBuscarCategoria'>
            Buscar Categoria
          </label>
          <input
            className='input__form'
            id='textBuscarCategoria'
            type='text'
            value={buscarCategoria}
            onChange={handleBuscarCategoria}
          />
        </section>

        <div className='h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm'>
          <table className='w-full '>
            <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
              <tr>
                <th className='text-start pl-3'>Nombre</th>
                <th className='text-center w-28'>Editar</th>
                <th className='text-center w-28'>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan='5' className='text-center py-4'>
                    <div className='flex items-center justify-center'>
                      <div className='animate-spin'>
                        <div className='w-8 h-8 border-2 border-blue-900 rounded-full'></div>
                      </div>
                      <span className='ml-2'>Cargando...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                data
                  .filter((data) =>
                    data.nombre
                      .toLowerCase()
                      .includes(buscarCategoria.toLowerCase())
                  )
                  .map((categoria, index) => (
                    <tr className='even:bg-slate-100' key={index}>
                      <td className='pl-3'>{categoria.nombre}</td>
                      <td className='text-center text-blue-800'>
                        <button
                          onClick={(event) =>
                            editarCategoria(
                              event,
                              categoria.id,
                              categoria.nombre
                            )
                          }
                        >
                          <EditIcon clases={'size-7 cursor-pointer'} />
                        </button>
                      </td>
                      <td className='text-center text-red-800'>
                        <button
                          onClick={(event) =>
                            eliminarCategoria(event, categoria.id)
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
    </>
  )
}
const PageCategorias = () => {
  return <PanelDivisor Page={<Page />} />
}

export default PageCategorias
