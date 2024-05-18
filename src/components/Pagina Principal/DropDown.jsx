import React, { useState } from 'react'
import ArrowDownIcon from '../../assets/ArrowDownIcon'
import ArrowUpIcon from '../../assets/ArrowUpIcon'
import { NavLink } from 'react-router-dom'

const DropDown = ({ nombre, Icon, val, childrens }) => {
  const [isOpen, setIsOpen] = useState(val)
  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault()
          setIsOpen((isOpen) => !isOpen)
        }}
        className='btn__menu flex '
      >
        {Icon}

        <div className='flex flex-grow justify-between '>
          {nombre}
          {!isOpen ? (
            <ArrowDownIcon clases={'size-7 '} />
          ) : (
            <ArrowUpIcon clases={'size-7 '} />
          )}
        </div>
      </button>
      {isOpen && (
        <div className='w-ful relative pl-10'>
          {childrens.map((children, index) => {
            return (
              <div key={index}>
                <NavLink to={children.ruta}>
                  {({ isActive }) => {
                    return (
                      <button
                        className={isActive ? 'btn__menu__active' : 'btn__menu'}
                      >
                        {children.icon}
                        {children.nombre}
                      </button>
                    )
                  }}
                </NavLink>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default DropDown
