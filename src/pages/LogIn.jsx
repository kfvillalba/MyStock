import React, { useEffect } from 'react'
import { useState } from 'react'
import RegisterForm from '../components/Usuario y Empresa/RegisterForm'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  auth,
  googleProvider,
  githutProvider,
  facebookProvider,
} from '../FireBaseConfig'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import Swal from 'sweetalert2'
import depositoImage from '../assets/Login.gif'
import { loginWithEmailPassword, sendEmail } from '../components/Fetchs/API_USU'

const LogIn = () => {
  const [provider, setProvider] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const Navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    Navigate('/dashboard')
  })

  const [showRegisterForm, setShowRegisterForm] = useState(false)

  const handleShowRegisterForm = () => {
    setShowRegisterForm(true)
  }

  const handleShowAuthForm = () => {
    setShowRegisterForm(false)
  }

  const obtenerUsuario = (userName, email, photoURL) => {
    localStorage.setItem('email', email)
    localStorage.setItem('userName', userName)
    localStorage.setItem('photoURL', photoURL || '../src/assets/perfil1.png')
  }

  const logIngEmailPassword = (email, password) => {
    loginWithEmailPassword(email, password)
      .then((data) => {
        setProvider(data.email)
        obtenerUsuario(data.userName, data.email)

        sendEmail(email)
          .then(() => console.log('Correo electrónico enviado con éxito'))
          .catch((error) =>
            console.error('Error al enviar el correo electrónico:', error)
          )

        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido!',
        })
      })
      .catch((error) => {
        console.error('Error al autenticar usuario:', error)
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos',
        })
      })
  }

  const logIngGoogle = () => {
    signInWithPopup(auth, googleProvider).then((data) => {
      setProvider(data.user.email)
      obtenerUsuario(data.user.displayName, data.user.email, data.user.photoURL)
      console.log(localStorage)
      console.log(data.user)
    })
  }

  const logIngGithub = () => {
    signInWithPopup(auth, githutProvider).then((data) => {
      setProvider(data.user.email)
      obtenerUsuario(data.user.displayName, data.user.email)
      console.log(localStorage)
    })
  }

  const logIngFacebook = () => {
    signInWithPopup(auth, facebookProvider).then((data) => {
      setProvider(data.user.email)
      obtenerUsuario(data.user.displayName, data.user.email)
      console.log(localStorage)
    })
  }

  useEffect(() => {
    setProvider(localStorage.getItem('email'))
  }, [provider])

  return provider ? (
    Navigate('/dashboard')
  ) : (
    <>
      {showRegisterForm ? (
        <RegisterForm handleShowAuthForm={handleShowAuthForm} />
      ) : (
        <div className='min-h-screen bg-purple-dark text-gray-900 flex justify-center'>
          <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
            <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12'>
              <div>
                <img
                  src='../src/assets/en-stock.png'
                  className='w-10 mx-auto'
                />
              </div>
              <div className='mt-2 flex flex-col items-center'>
                <h1 className='text-2xl xl:text-3xl font-extrabold'>
                  Iniciar Sesión
                </h1>
                <div className='w-full flex-1 mt-8'>
                  <div className='flex flex-col items-center'>
                    <button
                      onClick={logIngGoogle}
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                    >
                      <div className='bg-white p-2 rounded-full'>
                        <svg className='w-4' viewBox='0 0 533.5 544.3'>
                          <path
                            d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                            fill='#4285f4'
                          />
                          <path
                            d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                            fill='#34a853'
                          />
                          <path
                            d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                            fill='#fbbc04'
                          />
                          <path
                            d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                            fill='#ea4335'
                          />
                        </svg>
                      </div>
                      <span className='ml-4'>Continuar con google</span>
                    </button>

                    <button
                      className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline mt-5'
                      onClick={logIngGithub}
                    >
                      <div className='bg-white p-1 rounded-full'>
                        <svg className='w-6' viewBox='0 0 32 32'>
                          <path
                            fillRule='evenodd'
                            d='M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z'
                          />
                        </svg>
                      </div>
                      <span className='ml-4'>Continuar con GitHub</span>
                    </button>
                  </div>
                  <form
                    onSubmit={handleSubmit((data) =>
                      logIngEmailPassword(data.email, data.password)
                    )}
                  >
                    {showRegisterForm && <RegisterForm />}
                    <div className='w-full flex items-center justify-between py-10'>
                      <hr className='w-full bg-gray-400' />
                      <p className='text-base font-medium leading-4 px-2.5 text-gray-400'>
                        O
                      </p>
                      <hr className='w-full bg-gray-400' />
                    </div>

                    <div className='mx-auto max-w-xs'>
                      <input
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white'
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
                      <input
                        className='w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
                        type='password'
                        placeholder='Password'
                        id='password'
                        {...register('password', {
                          required: {
                            value: true,
                            message: 'La contraseña es obligatoria',
                          },
                          minLength: {
                            value: 6,
                            message:
                              'La contraseña debe tener minimo 3 caracteres',
                          },
                          maxLength: {
                            value: 20,
                            message:
                              'La contraseña debe tener maximo 20 caracteres',
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
                      <button
                        className='mt-5 tracking-wide font-semibold bg-gray-800 text-white w-full py-4 rounded-lg hover:bg-green-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
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
                        <span className='ml-'> Iniciar Sesión</span>
                      </button>
                      <p
                        tabIndex='0'
                        className='text-center focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500'
                      >
                        ¿No tienes cuenta?{' '}
                        <button
                          onClick={handleShowRegisterForm}
                          className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer'
                        >
                          Regístrate aquí
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
      )}
    </>
  )
}

export default LogIn
