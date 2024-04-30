import React from 'react'
import { Card } from '@tremor/react'

export function CardGeneral({ nombre, logo, cantidad, color }) {
  return (
    <Card
      className={`cardStyle [&>div>svg]:hover:-rotate-45 [&>div>svg]:transition [&>div>svg]:duration-300 ${color}`}
    >
      <div className='flex items-center justify-between'>
        <div>
          <p className=''>{nombre}</p>
          <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
            {cantidad}
          </p>
        </div>
        {logo}
      </div>
    </Card>
  )
}
