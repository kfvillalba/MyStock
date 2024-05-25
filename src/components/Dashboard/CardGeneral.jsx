import React from 'react'

export function CardGeneral({ nombre, logo, cantidad, color }) {
  const cantidadClassName =
    nombre === 'Inversión'
      ? 'text-red-500'
      : nombre === 'Ingresos'
      ? 'text-green-500'
      : ''
  return (
    <div
      className={`w-1/4 h-fit p-2 shadow-md shadow-gray-300 rounded-lg [&>div>svg]:hover:-rotate-45 [&>div>svg]:transition [&>div>svg]:duration-300 ${color}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className=''>{nombre}</p>
          <p
            className={`text-xl text-tremor-content-strong dark:text-dark-tremor-content-strong  ${cantidadClassName}`}
          >
            {cantidad}
          </p>
        </div>
        {logo}
      </div>
    </div>
  )
}
