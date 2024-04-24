import React from 'react'
import { Card } from '@tremor/react'

export function CardGeneral({ nombre, logo, cantidad }) {
  return (
    <Card className='cardStyle' decoration='top'>
      <div className='flex items-center justify-between'>
        <div>
          <p className=''>{nombre}</p>
          <p className='text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold'>
            {cantidad}
          </p>
        </div>
        <div>{logo}</div>
      </div>
    </Card>
  )
}
