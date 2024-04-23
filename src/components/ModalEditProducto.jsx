import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const ModalEditProducto = ({
  open,
  onClose,
  editar,
  categorias,
  dataProducto,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `https://localhost:7073/inventario-service/Productos/Actualizar?id=${dataProducto.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )
      console.log(data)

      if (response.ok) {
        editar(data)
        onClose()
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Producto editado con exito',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('Error al guardar el producto')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar el producto',
        text: error.message,
      })
    }
  }
  if (!open) return null
  return (
    <div className='fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50'>
      <div className=''>
        <form
          className='bg-white rounded-lg shadow-sm p-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <label htmlFor='nombre' className='label__form'>
              Nombre de la categoria
            </label>
            <input
              defaultValue={`${dataProducto.nombre}`}
              id='nombre'
              type='text'
              className='input__form'
              {...register('nombre', {
                required: {
                  value: true,
                  message: 'El nombre es obligatorio',
                },
              })}
            />
            <span className='message'>{errors?.nombre?.message}</span>
          </div>
          <div>
            <label htmlFor='descripcion' className='label__form'>
              Descripcion de la categoria
            </label>
            <input
              defaultValue={`${dataProducto.descripcion}`}
              id='descripcion'
              type='text'
              className='input__form'
              {...register('descripcion', {
                required: {
                  value: true,
                  message: 'La descripcion es obligatoria',
                },
              })}
            />
            <span className='message'>{errors?.descripcion?.message}</span>
          </div>
          <div>
            <label htmlFor='idCategoria' className='label__form'>
              Categorias
            </label>
            <select
              defaultValue={`${dataProducto.idCategoria}`}
              id='categoria'
              type='text'
              className='input__form'
              {...register('idCategoria', {
                // valueAsNumber: true,
                required: {
                  value: true,
                  message: 'La categoria es obligatoria',
                },
              })}
            >
              {categorias.map((categoria) => {
                return (
                  <option key={categoria.id} value={`${categoria.id}`}>
                    {categoria.nombre}
                  </option>
                )
              })}
            </select>
            <span className='message'>{errors?.idCategoria?.message}</span>
          </div>
          <div className='flex gap-4 justify-center'>
            <button type='submit' className='bnt__primary mt-3'>
              Aceptar
            </button>
            <button
              onClick={() => {
                reset(), onClose()
              }}
              className='bnt__danger mt-3 '
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalEditProducto
