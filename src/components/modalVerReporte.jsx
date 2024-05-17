import React from 'react'
import { FaTimes } from 'react-icons/fa'

function ModalVerReporte({ children, onClose }) {
  return (
    <div className='fixed w-full top-0 left-0 h-full z-20 flex items-center justify-center bg-black/50'>
      <div className='relative bg-white rounded-lg shadow-lg p-6'>
        <button
          className='absolute top-0 right-0 m-2 p-2 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none'
          onClick={onClose}
        >
          <FaTimes className='text-gray-600' />
        </button>
        {children}
      </div>
    </div>
  )
}

export default ModalVerReporte
