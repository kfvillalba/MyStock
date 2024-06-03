import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal'
import defaultAvatar from '../assets/perfil.png'
import defaultCover from '../assets/portada.png'
import { FiArrowLeft, FiTrash } from 'react-icons/fi'
import { useForm } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import TopNavbar from '../components/Pagina Principal/TopNavbar'

Modal.setAppElement('#root')

const ProfileHeader = ({ avatar, cover, openModal, navigateBack }) => {
  return (
    <div className='relative w-full h-64'>
      <img src={cover} alt='Cover' className='w-full h-full object-cover' />
      <div className='absolute top-2 left-2'>
        <button
          onClick={navigateBack}
          className=' text-white hover:text-white text-3xl bg-slate-500'
        >
          <FiArrowLeft />
        </button>
      </div>
      <div className='absolute top-2 right-2'>
        <button
          onClick={openModal}
          className='text-red-500 hover:text-red-600 text-3xl'
        >
          <FiTrash />
        </button>
      </div>
      <label
        htmlFor='cover'
        className='absolute bottom-2 right-2 bg-white rounded-full p-2 cursor-pointer'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6 text-gray-600'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 21a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1h7l2-2h4a1 1 0 011 1v14z'
          />
        </svg>
        <input
          id='cover'
          type='file'
          className='hidden'
          accept='image/*'
          onChange={(e) => handleImageChange(e, 'cover')}
        />
      </label>
      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-32 h-32 bg-gray-200 rounded-full overflow-hidden border-4 border-white'>
        <img src={avatar} alt='Avatar' className='object-cover w-full h-full' />
        <label
          htmlFor='image'
          className='absolute bottom-0 right-0 bg-white rounded-full p-2 cursor-pointer'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 text-gray-600'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 21a1 1 0 01-1 1H6a1 1 0 01-1-1V8a1 1 0 011-1h7l2-2h4a1 1 0 011 1v14z'
            />
          </svg>
          <input
            id='image'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={(e) => handleImageChange(e, 'avatar')}
          />
        </label>
      </div>
    </div>
  )
}

const UserInfo = ({ username, email, password, confirmPassword }) => {
  return (
    <div className='w-full mt-10 rounded-radius md:w-1/2 p-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Mi Perfil</h2>
      <form className='bg-white rounded-lg shadow-sm shadow-gray-300 p-5'>
        <div>
          <label htmlFor='username' className='label__form'>
            Nombre de Usuario
          </label>
          <input
            id='username'
            type='text'
            className='input__form'
            value={username}
            readOnly
          />
        </div>
        <div>
          <label htmlFor='email' className='label__form'>
            Correo Electrónico
          </label>
          <input
            id='email'
            type='email'
            className='input__form'
            value={email}
            readOnly
          />
        </div>
        <div>
          <label htmlFor='password' className='label__form'>
            Contraseña
          </label>
          <input
            id='password'
            type='password'
            className='input__form'
            value={password}
            readOnly
          />
        </div>
        <div className='flex gap-4 justify-start'>
          <button type='submit' className='bnt__primary mt-3'>
            cambiar contraseña
          </button>
        </div>
      </form>
    </div>
  )
}

const AdditionalInfo = () => {
  const location = useLocation()
  const empresa = location.state?.empresa || null

  const [isEditMode, setIsEditMode] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (empresa) {
      setValue('nombre', empresa.nombre)
      setValue('telefono', empresa.telefono)
      setValue('direccion', empresa.direccion)
      setIsEditMode(true)
    } else {
      reset()
      setIsEditMode(false)
    }
  }, [empresa, setValue, reset])

  const getUsuarioFromLocalStorage = () => {
    return localStorage.getItem('email') || ''
  }

  const onSubmit = async (data) => {
    const email = getUsuarioFromLocalStorage()
    const formData = {
      ...data,
      email: email,
    }

    const url = isEditMode
      ? `https://localhost:7073/inventario-service/Empresas/Actualizar?email=${email}`
      : 'https://localhost:7073/inventario-service/Empresas/Agregar'

    const method = isEditMode ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: isEditMode
            ? 'Datos empresa actualizados'
            : 'Datos empresa guardados',
          showConfirmButton: false,
          timer: 1500,
        })
        setIsEditMode(true)
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

  return (
    <div className='w-full mt-10 md:w-1/2 p-4'>
      <h2 className='text-2xl font-bold mb-4 text-center'>
        Datos de la Empresa
      </h2>
      <form
        className='bg-white rounded-lg shadow-sm shadow-gray-300 p-5'
        onSubmit={handleSubmit(onSubmit)}
      >
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
            Teléfono de la empresa
          </label>
          <input
            id='telefono'
            type='text'
            className='input__form'
            {...register('telefono', {
              required: {
                value: true,
                message: 'El teléfono es obligatorio',
              },
              minLength: {
                value: 10,
                message: 'El teléfono debe tener 10 números',
              },
              maxLength: {
                value: 10,
                message: 'El teléfono debe tener 10 números',
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
            {isEditMode ? 'Actualizar' : 'Agregar'}{' '}
          </button>
        </div>
      </form>
    </div>
  )
}

const PagePerfil = () => {
  const [avatar, setAvatar] = useState(null)
  const [cover, setCover] = useState(null)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [genero, setGenero] = useState('')
  const [intereses, setIntereses] = useState('')
  const [error, setError] = useState({ type: '', message: '' })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputUsername, setInputUsername] = useState('')
  const Navigate = useNavigate()

  useEffect(() => {
    const storedUsername = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('email')
    const storedAvatar = localStorage.getItem('photoURL')
    const storedCover = localStorage.getItem('coverURL')

    setUsername(storedUsername || '')
    setEmail(storedEmail || '')
    setAvatar(storedAvatar || defaultAvatar)
    setCover(storedCover || defaultCover)
  }, [])

  const handleDelete = () => {
    if (inputUsername.trim() === username) {
      fetch(
        `https://localhost:7073/autenticacion-service/Usuarios/EliminarCuentaPorUserName?userName=${username}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((response) => {
          if (response.ok) {
            Swal.fire({
              position: 'top-center',
              icon: 'success',
              title: 'Perfil eliminado',
              showConfirmButton: false,
              timer: 1000,
            }).then(() => {
              localStorage.clear()
              Navigate('/login')
            })
          } else {
            throw new Error('No se pudo eliminar el perfil')
          }
        })
        .catch((error) => {
          console.error('Error al eliminar el perfil:', error)
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el perfil. Por favor, inténtalo de nuevo más tarde.',
          })
        })
    } else {
      setError({
        type: 'username',
        message: 'El nombre de usuario no coincide',
      })
    }
  }

  const handleImageChange = (e, type) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (type === 'avatar') {
          setAvatar(reader.result)
          localStorage.setItem('photoURL', reader.result)
        } else if (type === 'cover') {
          setCover(reader.result)
          localStorage.setItem('coverURL', reader.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setError({ type: '', message: '' })
    setInputUsername('')
  }

  const confirmDelete = () => {
    handleDelete()
    closeModal()
  }

  return (
    <>
      <div>
        <div>
          <TopNavbar />
        </div>
        <div className='h-screen bg-gray-100'>
          <ProfileHeader
            avatar={avatar}
            cover={cover}
            openModal={openModal}
            navigateBack={() => Navigate('/Dashboard')}
          />
          <div className='flex justify-center'>
            <UserInfo
              username={username}
              email={email}
              password={password}
              confirmPassword={confirmPassword}
            />
            <AdditionalInfo
              genero={genero}
              intereses={intereses}
              setGenero={setGenero}
              setIntereses={setIntereses}
            />
          </div>
          <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel='Confirmar Eliminación'
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                zIndex: 1000,
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '90%',
                maxWidth: '500px',
                padding: '20px',
              },
            }}
          >
            <h2 className='text-xl font-bold mb-4'>Confirmar Eliminación</h2>
            <p className='mb-4'>
              Por favor, escribe tu nombre de usuario para confirmar.
            </p>
            <input
              type='text'
              className='p-2 border rounded-md mb-4 w-full'
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
            {error.type === 'username' && (
              <p className='text-red-500 text-sm mb-4'>{error.message}</p>
            )}
            <div className='flex justify-end'>
              <button
                onClick={closeModal}
                className='bg-gray-500 text-white px-4 py-2 rounded-md mr-2'
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className='bg-red-500 text-white px-4 py-2 rounded-md'
              >
                Eliminar
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default PagePerfil
