import React from 'react'
import { Link } from 'react-router-dom'
import SideNavbar from '../components/Pagina Principal/SideNavbar'

const PageNotFound = () => {
  return (
    <div className='flex h-screen w-screen relative'>
      <div className='w-1/5'>
        <SideNavbar />
      </div>
      <div className='w-4/5 flex flex-col justify-center items-center relative'>
        <h1 className='font-extrabold text-9xl '>404</h1>
        <h1 className='mb-10'>Pagina no Encontrada</h1>
        <Link to={'/dashboard'}>
          <button className='rounded-lg w-32 hover:bg-purple-light py-2 my-1 text-white bg-purple-dark'>
            Regresar
          </button>
        </Link>
      </div>
    </div>
  )
}

export default PageNotFound
