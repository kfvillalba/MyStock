import React, { useState } from 'react'
import DashboardIcon from '../../assets/DashboardIcon'
import { NavLink, useNavigate } from 'react-router-dom'
import ClienteIcon from '../../assets/ClienteIcon'
import ProductosIcon from '../../assets/ProductosIcon'
import ControlExistenciasIcon from '../../assets/ControlExistenciasIcon'
import ReportesIcon from '../../assets/ReportesIcon'
import DropDown from './DropDown'
import CategoriasIcon from '../../assets/CategoriasIcon'
import ProveedoresIcon from '../../assets/ProveedoresIcon'

const SideNavbar = () => {
  const Navigate = useNavigate()
  const childrenGestion = [
    {
      ruta: '/gestion/categorias',
      icon: <CategoriasIcon clases={'mr-3 size-7'} />,
      nombre: 'Categorias',
    },
    {
      ruta: '/gestion/productos',
      icon: <ProductosIcon clases={'mr-3 size-7'} />,
      nombre: 'Productos',
    },
    {
      ruta: '/gestion/proveedores',
      icon: <ProveedoresIcon clases={'mr-3 size-7'} />,
      nombre: 'Proveedores',
    },
  ]
  const childrenStock = [
    {
      ruta: '/stock/entradas',
      icon: <CategoriasIcon clases={'mr-3 size-7'} />,
      nombre: 'Entradas',
    },
    {
      ruta: '/stock/salidas',
      icon: <ProductosIcon clases={'mr-3 size-7'} />,
      nombre: 'Salidas/Facturacion',
    },
  ]

  return (
    <nav className='bg-slate-100   md:text-xs  lg:text-sm object-cover h-full text-black font-bold relative flex flex-col'>
      <section className='flex-wrap'>
        <h1 className='py-3 '>Navegación Principal</h1>
      </section>
      <section className='h-full [&>footer>ul>li]:mx-3 [&>header>ul>li]:mx-3 flex flex-col relative'>
        <header className='overflow-y-auto h-1 flex flex-col flex-grow  mt-2'>
          <ul>
            <li>
              <NavLink to={'/dashboard'}>
                {({ isActive }) => {
                  return (
                    <button
                      className={isActive ? 'btn__menu__active' : 'btn__menu'}
                    >
                      <DashboardIcon clases={'mr-3 size-7'} />
                      Dashboard
                    </button>
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink to={'/clientes'}>
                {({ isActive }) => {
                  return (
                    <button
                      className={isActive ? 'btn__menu__active' : 'btn__menu'}
                    >
                      <ClienteIcon clases={'mr-3 size-7'} />
                      Clientes
                    </button>
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/gestion'}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                {({ isActive }) => {
                  return (
                    <DropDown
                      nombre={'Gestión de Productos'}
                      Icon={<ProductosIcon clases={'mr-3 size-7'} />}
                      val={isActive}
                      childrens={childrenGestion}
                    />
                  )
                }}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/stock'}
                onClick={(e) => {
                  e.preventDefault()
                }}
              >
                {({ isActive }) => {
                  return (
                    <DropDown
                      nombre={'Crontrol Existencias'}
                      Icon={<ControlExistenciasIcon clases={'mr-3 size-7'} />}
                      val={isActive}
                      childrens={childrenStock}
                    />
                  )
                }}
              </NavLink>
            </li>

            <li>
              <NavLink to={'/reportes'}>
                {({ isActive }) => {
                  return (
                    <button
                      className={isActive ? 'btn__menu__active' : 'btn__menu'}
                    >
                      <ReportesIcon clases={'mr-3 size-7'} />
                      Reportes
                    </button>
                  )
                }}
              </NavLink>
            </li>
          </ul>
        </header>
        <footer className='my-1'></footer>
      </section>
    </nav>
  )
}

export default SideNavbar
