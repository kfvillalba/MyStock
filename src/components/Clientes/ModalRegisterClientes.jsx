import React from 'react'
import { useForm } from 'react-hook-form'
import Swal from 'sweetalert2'

const ModalRegisterClientes = ({ open, onClose, registrar }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const onSubmit = async (data) => {
    console.log(JSON.stringify(data))
    try {
      const response = await fetch(
        'https://localhost:7073/inventario-service/Clientes/Agregar',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (response.ok) {
        registrar(data)
        onClose()
        reset()
        Swal.fire({
          icon: 'success',
          title: 'Cliente guardado',
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
        title: 'Error al guardar el cliente',
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
          <div>
            <label htmlFor='nombre' className='label__form'>
              Nombre del cliente
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
            <label htmlFor='celular' className='label__form'>
              Telefono del cliente
            </label>
            <input
              id='celular'
              type='text'
              className='input__form'
              {...register('celular', {
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
            <span className='message'>{errors?.celular?.message}</span>
          </div>
          <div>
            <label htmlFor='correo' className='label__form'>
              Correo del cliente
            </label>
            <input
              id='correo'
              type='email'
              className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
              {...register('correo', {
                required: {
                  value: true,
                  message: 'El correo es obligatorio',
                },
                pattern: {
                  value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                  message: 'El correo no es valido',
                },
              })}
            />
            <span className='message'>{errors?.correo?.message}</span>
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

export default ModalRegisterClientes
