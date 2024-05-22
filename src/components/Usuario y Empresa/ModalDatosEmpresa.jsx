import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const ModalDatosEmpresa = ({ open, onClose, registrar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const getUsuarioFromLocalStorage = () => {
    return localStorage.getItem('email') || ''
  }

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      email: getUsuarioFromLocalStorage(),
    }

    console.log(JSON.stringify(formData))

    try {
      const response = await fetch(
        'https://localhost:7073/inventario-service/Empresas/Agregar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      )

      if (response.ok) {
        onClose()
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Datos empresa guardados',
          showConfirmButton: false,
          timer: 1500,
        })
      } else {
        throw new Error('Error al guardar el cliente')
      }
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar los datos',
        text: error.message,
      })
    }
  }

  if (!open) return null

  return (
    <div className='fixed w-full top-0 left-0 h-full z-20 flex items-center justify-center bg-black/50'>
      <div className=''>
        <form
          className='bg-white rounded-lg shadow-sm p-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='text-center font-bold py-2'>
            <label>DATOS DE LA EMPRESA</label>
          </div>
          <div>
            <label htmlFor='nombre' className='label__form'>
              Nombre de la empresa
            </label>
            <input
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
            <label htmlFor='telefono' className='label__form'>
              Telefono de la empresa
            </label>
            <input
              id='telefono'
              type='text'
              className='input__form'
              {...register('telefono', {
                required: {
                  value: true,
                  message: 'El telefono es obligatorio',
                },
                minLength: {
                  value: 10,
                  message: 'El telefono debe tener 10 Numeros',
                },
                maxLength: {
                  value: 10,
                  message: 'El telefono debe tener 10 Numeros',
                },
              })}
            />
            <span className='message'>{errors?.telefono?.message}</span>
          </div>
          <div>
            <label htmlFor='direccion' className='label__form'>
              Dirección de la empresa
            </label>
            <input
              id='direccion'
              type='text'
              className='input__form'
              {...register('direccion', {
                required: {
                  value: true,
                  message: 'La dirección es obligatoria',
                },
              })}
            />
            <span className='message'>{errors?.direccion?.message}</span>
          </div>
          <div className='flex gap-4 justify-center'>
            <button type='submit' className='bnt__primary mt-3'>
              Aceptar
            </button>
            <button
              onClick={() => {
                reset()
                onClose()
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

export default ModalDatosEmpresa
