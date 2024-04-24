import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { auth } from '../FireBaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import depositoImage from '../assets/registrarse.gif'

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

  const checkUserExists = async (email, password) => {
    const url = `http://localhost:5155/authetication-service/Usuarios/Autenticacion?email=${encodeURIComponent(
      email
    )}&password=${encodeURIComponent(password)}`

    try {
      const response = await fetch(url)
      return response.ok
    } catch (error) {
      console.error('Error al verificar usuario:', error)
      return false
    }
  }

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
    <div className='min-h-screen bg-purple-dark text-gray-900 flex justify-center'>
      <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
          <div>
            <img src='../src/assets/en-stock.png' className='w-10 mx-auto' />
          </div>
          <div className='mt-2 flex flex-col items-center'>
            <h1 className='text-2xl xl:text-3xl font-extrabold'>Registrarse</h1>
            <div className='w-full flex-1 mt-4'>
              <form onSubmit={onSubmit}>
                <div className='mx-auto max-w-xs'>
                  <label htmlFor='username' className='text-sm font-extrabold'>
                    Nombre de usuario
                  </label>
                  <input
                    id='username'
                    type='text'
                    placeholder='Nombre de usuario'
                    className='mt-1 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
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
                      style={{
                        color: 'red',
                        fontSize: '0.8rem',
                        display: 'block',
                      }}
                    >
                      {errors.username.message}
                    </span>
                  )}
                  <div className='mt-4'>
                    <label htmlFor='correo' className='text-sm font-extrabold'>
                      Correo
                    </label>
                    <input
                      className='mt-1 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                      type='email'
                      id='email'
                      placeholder='Email'
                      {...register('email', {
                        required: {
                          value: true,
                          message: 'El correo es obligatorio',
                        },
                        pattern: {
                          value:
                            /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
                          message: 'El correo no es valido',
                        },
                      })}
                    />

                    {errors.email && (
                      <span
                        style={{
                          color: 'red',
                          fontSize: '0.8rem',
                          display: 'block',
                        }}
                      >
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className='mt-4'>
                    <label
                      htmlFor='password'
                      className='text-sm font-extrabold'
                    >
                      Contraseña
                    </label>
                    <input
                      id='password'
                      type='password'
                      placeholder='Contraseña'
                      className='mt-1 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
                      {...register('password', {
                        required: 'La contraseña es obligatoria',
                        minLength: {
                          value: 6,
                          message:
                            'La contraseña debe tener al menos 6 caracteres',
                        },
                      })}
                    />
                    {errors.password && (
                      <span
                        style={{
                          color: 'red',
                          fontSize: '0.8rem',
                          display: 'block',
                        }}
                      >
                        {errors.password.message}
                      </span>
                    )}
                    {errors.password && (
                      <span
                        style={{
                          color: 'red',
                          fontSize: '0.8rem',
                          display: 'block',
                        }}
                      >
                        {errors.password.message}
                      </span>
                    )}
                  </div>
                  <div className='mt-4'>
                    <label
                      htmlFor='contraseña2'
                      className='text-sm font-extrabold'
                    >
                      Confirmar contraseña
                    </label>

                    <input
                      //id="password"
                      type='password'
                      placeholder='Confirmar contraseña'
                      className='mt-1 w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
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
                  <button
                    className='mt-6 tracking-wide font-semibold bg-gray-800 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
                    type='submit'
                  >
                    <svg
                      className='w-6 h-6 -ml-2'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                      <circle cx='8.5' cy='7' r='4' />
                      <path d='M20 8v6M23 11h-6' />
                    </svg>
                    <span className='ml-'> Registrarse</span>
                  </button>
                  <p
                    tabIndex='0'
                    className='text-center focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500'
                  >
                    ¿Ya tienes cuenta?{' '}
                    <button
                      className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer'
                      onClick={handleShowAuthForm}
                    >
                      Inicia sesión aquí
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className='flex-1 bg-green-100 text-center hidden lg:flex bor sm:rounded-lg'>
          <div
            className='m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat'
            style={{ backgroundImage: `url(${depositoImage})` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
