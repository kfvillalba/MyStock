import React from 'react'

const CardDashboard = ({ Logo, nombre, cantidad }) => {
  return (
    <div className=' rounded-lg border-purple-dark flex w-80 h-32 items-center hover:cursor-pointer shadow-md shadow-purple-light'>
      <div>{Logo}</div>
      <div className='mr-2'>
        <h1>{nombre}</h1>
        <p className='text-center'>{cantidad}</p>
      </div>
    </div>
  )
}

export default CardDashboard
