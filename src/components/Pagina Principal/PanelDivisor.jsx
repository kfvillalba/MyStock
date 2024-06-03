import React from 'react'
import SideNavbar from './SideNavbar'
import TopNavbar from './TopNavbar'

const PanelDivisor = ({ Page, titulo }) => {
  return (
    <div className='flex flex-col fixed  h-screen w-screen '>
      <TopNavbar titulo={titulo} />
      <div className='flex h-full w-full pt-1'>
        <div className='w-1/6'>
          <SideNavbar />
        </div>
        <div className='w-5/6 relative'>{Page}</div>
      </div>
    </div>
  )
}

export default PanelDivisor
