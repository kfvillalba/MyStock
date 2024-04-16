import React, { useEffect } from 'react'
import { useState } from 'react'
import RegisterForm from '../components/RegisterForm'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  auth,
  googleProvider,
  githutProvider,
  facebookProvider,
} from '../FireBaseConfig'
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth'
import GoogleIcon from '../assets/GoogleIcon'
import FacebookIcon from '../assets/FacebookIcon'
import GithubIcon from '../assets/GithubIcon'
import Swal from 'sweetalert2' // Importa SweetAlert2

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

  const obtenerUsuario = (displayName, email, photoURL) => {
    localStorage.setItem('email', email)
    localStorage.setItem('displayName', displayName)
    localStorage.setItem('photoURL', photoURL)
  }

  const logIngEmailPassword = (email, password) => {
    fetch(
      `https://localhost:7045/api/Usuarios/Autenticacion?email=${email}&password=${password}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('Usuario o contraseña incorrectos')
        }
      })
      .then((data) => {
        setProvider(data.email)
        obtenerUsuario(data.displayName, data.email)

        // Envío del correo electrónico
        fetch('https://localhost:7062/EnviarEmail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            to: email, // Utilizamos el email del usuario que se está iniciando sesión
            subject: 'Iniciaste sesión en la aplicación MyStock',
            body: 'Si no fuiste tu, cambia de inmediato tu clave.',
            attachments: ['dfgdfg'],
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Correo electrónico enviado con éxito')
            } else {
              throw new Error('Error al enviar el correo electrónico')
            }
          })
          .catch((error) => {
            console.error('Error al enviar el correo electrónico:', error)
          })

        // Mostrar alerta de éxito
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido!',
        })
      })
      .catch((error) => {
        console.error('Error al autenticar usuario:', error)
        // Mostrar alerta de error
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
    <div className='h-full bg-gradient-to-tl from-purple-dark to-indigo-900 w-full py-16 px-4'>
      <div className='flex flex-col items-center justify-center'>
        {showRegisterForm ? (
          <RegisterForm handleShowAuthForm={handleShowAuthForm} />
        ) : (
          <div className='bg-white shadow rounded lg:w-1/3 md:w-1/2 w-full p-10'>
            <p
              tabIndex='0'
              className='focus:outline-none text-2xl font-extrabold leading-6 text-gray-800'
            >
              Ingresa con tu cuenta
            </p>
            <button
              onClick={logIngGoogle}
              aria-label='Continua con Google'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-10'
            >
              <GoogleIcon />
              <p className='text-base font-medium ml-4 text-gray-700'>
                Continua con Google
              </p>
            </button>
            <button
              onClick={logIngGithub}
              aria-label='Continua con Github'
              role='button'
              className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4'
            >
              <GithubIcon />
              <p className='text-base font-medium ml-4 text-gray-700'>
                Continua con Github
              </p>
            </button>
            <button
              onClick={logIngFacebook}
              aria-label='Continua con Facebook'
              role='button'
              className='focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4'
            >
              <FacebookIcon />
              <p className='text-base font-medium ml-4 text-gray-700'>
                Continua con Facebook
              </p>
            </button>
            <form
              onSubmit={handleSubmit((data) =>
                logIngEmailPassword(data.email, data.password)
              )}
            >
              <p
                tabIndex='0'
                className='focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500'
              >
                ¿No tienes cuenta?{' '}
                <button
                  onClick={handleShowRegisterForm}
                  className='hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none text-gray-800 cursor-pointer'
                >
                  Regístrate aquí
                </button>
              </p>
              {showRegisterForm && <RegisterForm />}

              <div className='w-full flex items-center justify-between py-5'>
                <hr className='w-full bg-gray-400' />
                <p className='text-base font-medium leading-4 px-2.5 text-gray-400'>
                  O
                </p>
                <hr className='w-full bg-gray-400' />
              </div>
              <div>
                <label
                  htmlFor='email'
                  className='text-sm font-medium leading-none text-gray-800'
                >
                  Correo electronico
                </label>
                <input
                  id='email'
                  type='email'
                  placeholder='Correo electrónico'
                  className='bg-gray-200 border rounded text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2'
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
              <div className='mt-6 w-full'>
                <label
                  htmlFor='pass'
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
                      required: {
                        value: true,
                        message: 'La contraseña es obligatoria',
                      },
                      minLength: {
                        value: 6,
                        message: 'La contraseña debe tener minimo 3 caracteres',
                      },
                      maxLength: {
                        value: 20,
                        message:
                          'La contraseña debe tener maximo 20 caracteres',
                      },
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
              <div className='mt-8'>
                {/* <Link to={"/dashboard"}> */}
                <button
                  role='button'
                  className='focus:ring-2 focus:ring-offset-2 focus:ring-gray-700 bg-gray-800 py-3 text-base font-medium rounded-lg w-full text-white'
                  type='submit'
                >
                  Iniciar Sesion
                </button>
                {/* </Link> */}
              </div>
              <div className='mt-6 flex items-center justify-center'>
                <button
                  type='button'
                  className='text-sm font-medium leading-none text-gray-800 focus:outline-none hover:underline'
                  onClick={handleShowAuthForm}
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default LogIn
