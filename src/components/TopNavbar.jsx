import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ProfileModal from '../components/modalVerUsuario'

const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <ProfileModal
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false)
        }}
      />
      <div className='h-20 shadow-sm bg-slate-200 shadow-gray-700 flex p-3 justify-between items-center '>
        <section className='flex items-center pl-5'>
          <button>
            <img
              className='rounded-full size-14'
              src={'../src/assets/en-stock.png'}
              alt='avatar'
            />
          </button>
          <h1 className='pl-5 text-center  text-purple-light text-5xl '>
            MyStock
          </h1>
        </section>

        <div className='relative'>
          <button
            type='button'
            className='Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark'
            onClick={() => setIsMenuOpen(true)}
          >
            <img
              className='rounded-full size-14'
              src={
                localStorage.getItem('photoURL') || '../src/assets/perfil1.png'
              }
              alt='avatar'
            />
          </button>
        </div>
      </div>
    </>
  )
}

export default TopNavbar
