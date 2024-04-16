import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../FireBaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'

const RegisterForm = ({ handleShowAuthForm }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    watch,
    reset,
  } = useForm()

  const [registroExitoso, setRegistroExitoso] = useState(false)

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      console.log('Usuario creado exitosamente:', userCredential.user)
      setRegistroExitoso(true)
      //handleShowAuthForm();
      Swal.fire({
        position: 'top-center',
        icon: 'success',
        title: 'Tu registro ha sido exitoso',
        showConfirmButton: false,
        timer: 1500,
      }).then((result) => {
        setTimeout(() => {
          reset()
          handleShowAuthForm()
        }, 1000)
      })
    } catch (error) {
      setError('general', {
        type: 'manual',
        message: 'Error al registrar usuario',
      })
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'El correo ya esta en uso',
        text: 'Por favor, inténtalo de nuevo.',
        showConfirmButton: true,
      })
      reset()
    }
  })

  return (
    <div className='h-full w-full py-16 px-4'>
      <div className='flex flex-col items-center justify-center'>
        <div className='bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10 mt-1'>
          <p
            tabIndex='0'
            className='focus:outline-none text-2xl font-extrabold leading-6 text-gray-800'
          >
            Regístrate
          </p>
          <form onSubmit={onSubmit}>
            <div className='mt-6'>
              <label
                htmlFor='username'
                className='text-sm font-medium leading-none text-gray-800'
              >
                Nombre de usuario
              </label>
              <input
                //id="username"
                type='text'
                placeholder='Nombre de usuario'
                className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                {...register('username', {
                  required: {
                    value: true,
                    message: 'El nombre es obligatorio',
                  },
                  minLength: {
                    value: 3,
                    message: 'El nombre debe tener minimo 3 caracteres',
                  },
                  maxLength: {
                    value: 20,
                    message: 'El username debe tener maximo 20 carcteres',
                  },
                })}
              />
              {errors.username && (
                <span
                  style={{ color: 'red', fontSize: '0.8rem', display: 'block' }}
                >
                  {errors.username.message}
                </span>
              )}
            </div>
            <div className='mt-6'>
              <label
                htmlFor='email'
                className='text-sm font-medium leading-none text-gray-800'
              >
                Correo electrónico
              </label>
              <input
                id='email'
                type='email'
                placeholder='Correo electrónico'
                className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                {...register('email', {
                  required: 'El correo es obligatorio',
                  pattern: {
                    value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                    message: 'El correo no es válido',
                  },
                })}
              />
              {errors.email && (
                <span
                  style={{ color: 'red', fontSize: '0.8rem', display: 'block' }}
                >
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='mt-6'>
              <label
                htmlFor='password'
                className='text-sm font-medium leading-none text-gray-800'
              >
                Contraseña
              </label>
              <div className='relative flex items-center justify-center'>
                <input
                  id='password'
                  type='password'
                  placeholder='Contraseña'
                  className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                  {...register('password', {
                    required: 'La contraseña es obligatoria',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres',
                    },
                  })}
                />
              </div>
              {errors.password && (
                <span
                  style={{ color: 'red', fontSize: '0.8rem', display: 'block' }}
                >
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className='mt-6'>
              <label
                htmlFor='confirmpassword'
                className='text-sm font-medium leading-none text-gray-800'
              >
                Confirmar contraseña
              </label>
              <div className='relative flex items-center justify-center'>
                <input
                  //id="password"
                  type='password'
                  placeholder='Confirmar contraseña'
                  className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
                  {...register('confirmpassword', {
                    required: {
                      value: true,
                      message: 'El confirmar contraseña es obligatorio',
                    },
                    validate: (value) =>
                      value === watch('password') ||
                      'Las contraseñas no coinciden',
                  })}
                />
                <div className='absolute right-0 mt-2 mr-3 cursor-pointer'>
                  <svg
                    width='16'
                    height='16'
                    viewBox='0 0 16 16'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    {/* Icono de visibilidad de contraseña */}
                  </svg>
                </div>
              </div>
              {errors.confirmpassword && (
                <span
                  style={{
                    color: 'red',
                    fontSize: '0.8rem',
                    display: 'block',
                  }}
                >
                  {errors.confirmpassword.message}
                </span>
              )}
            </div>
            <div className='mt-8'>
              <button
                className='focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 bg-gray-800 py-3 text-base font-medium rounded-lg w-full text-white'
                type='submit'
              >
                Registrarse
              </button>
            </div>
            <div
              className='mt-4 text-sm text-gray-500 justify'
              style={{ textAlign: 'center' }}
            >
              ¿Ya tienes una cuenta?{' '}
              <button
                onClick={handleShowAuthForm}
                className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline font-medium leading-none cursor-pointer text-black'
              >
                Iniciar sesión
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
