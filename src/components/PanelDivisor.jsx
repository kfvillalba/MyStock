import React from 'react'
import SideNavbar from './SideNavbar'

const PanelDivisor = ({ Page }) => {
  return (
    <div className='flex fixed h-screen w-screen '>
      <div className='w-1/5'>
        <SideNavbar />
      </div>
      <div className='w-4/5 p-5'>{Page}</div>
    </div>
  )
}

export default PanelDivisor
