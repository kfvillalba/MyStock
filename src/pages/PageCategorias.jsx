import React, { useState, useEffect } from 'react'
import PanelDivisor from '../components/Pagina Principal/PanelDivisor'
import DeleteIcon from '../assets/DeleteIcon'
import EditIcon from '../assets/EditIcon'
import ModalRegisterCategoria from '../components/Categorias/ModalRegisterCategoria'
import Swal from 'sweetalert2'
import ModalEditCategoria from '../components/Categorias/ModalEditCategoria'
import { fetchCategories, deleteCategory } from '../components/Fetchs/API_INV'

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
        console.log(error)
        Swal.fire('Eror', 'Hubo un error al obtener las categorias', 'error')
        setIsLoading(false)
      })
  }, [])

  const [formRegister, setformRegister] = useState(false)
  const [formEdit, setformEdit] = useState(false)

  const [dataCategoria, setDataCategoria] = useState({ id: '', nombre: '' })

  const eliminarCategoria = (event, id) => {
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
          fetchCategories().then((categoria) => setData(categoria))
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
          fetchCategories().then((categoria) => setData(categoria))
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
        }}
      />
      <div className='p-5 h-full flex flex-col shadow-md rounded-sm shadow-black '>
        <section className='flex flex-col '>
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

        <div className='container__table'>
          <div className='table-wrapper h-96'>
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
        <section className='self-end mt-2'>
          <button
            onClick={() => setformRegister(true)}
            className='bnt__primary'
          >
            Agregar Categoria
          </button>
        </section>
      </div>
    </>
  )
}
const PageCategorias = () => {
  return <PanelDivisor Page={<Page />} titulo={'Categorias'} />
}

export default PageCategorias
