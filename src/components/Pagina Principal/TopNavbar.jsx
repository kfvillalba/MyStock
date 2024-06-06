import React, { useState, useEffect } from 'react'
import ProfileModal from '../Usuario y Empresa/modalVerUsuario'
import ModalVerNotificaciones from '../Usuario y Empresa/modalVerNotificaciones'
import { IoIosNotifications } from 'react-icons/io'
const TopNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotification, setIsNotification] = useState(false)
  const [Notification, setNotification] = useState(0)

  useEffect(() => {
    const storedNotificationCount = localStorage.getItem('notificationCount')
    if (storedNotificationCount) {
      setNotification(parseInt(storedNotificationCount))
    }
  }, [])

  return (
    <>
      <ProfileModal
        open={isMenuOpen}
        onClose={() => {
          setIsMenuOpen(false)
        }}
      />
      <ModalVerNotificaciones
        open={isNotification}
        onClose={() => {
          setIsNotification(false)
        }}
        onNotificationCountChange={(count) => {
          localStorage.setItem('notificationCount', count.toString())
          setNotification(count)
        }}
      />
      <div className='2xl:h-20 h-12 shadow-sm bg-slate-200 shadow-gray-700 flex p-3 justify-between items-center '>
        <section className='flex items-center pl-5'>
          <button>
            <img
              className='rounded-full 2xl:size-14 size-9'
              src={'../src/assets/en-stock.png'}
              alt='avatar'
            />
          </button>
          <h1 className='pl-5 text-center  text-purple-light 2xl:text-2xl text-xl '>
            MyStock
          </h1>
        </section>

        <div className='flex 2xl:gap-10 gap-6'>
          <button
            type='button'
            className='Profile flex flex-wrap items-center rounded-full '
            onClick={() => setIsNotification(true)}
          >
            <div>
              {Notification > 0 && (
                <div className='absolute 2xl:ml-[30px] ml-[24px]  font-semibold rounded-full min-w-fit size-4 2xl:size-6 bg-red-900 2xl:p-1 text-xs text-white text-center items-center '>
                  {Notification}
                </div>
              )}

              <IoIosNotifications className='2xl:size-10 size-8  transition-all  text-gray-500 ' />
            </div>
          </button>
          <button
            type='button'
            className='Profile flex flex-wrap items-center rounded-full border-2 border-purple-dark'
            onClick={() => setIsMenuOpen(true)}
          >
            <img
              className='rounded-full 2xl:size-14 size-8'
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
