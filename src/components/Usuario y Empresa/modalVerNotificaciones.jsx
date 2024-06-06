import React, { useEffect, useState } from 'react'

const ModalVerNotificaciones = ({
  open,
  onClose,
  onNotificationCountChange,
}) => {
  const [notificaciones, setNotificaciones] = useState([])
  const email = localStorage.getItem('email')

  useEffect(() => {
    const fetchAndCreateNotifications = async () => {
      try {
        const responseProductosBaja = await fetch(
          'https://localhost:7073/inventario-service/Reportes/ProductosBajaExistencia'
        )
        const productosBaja = await responseProductosBaja.json()

        const responseProductosNula = await fetch(
          'https://localhost:7073/inventario-service/Reportes/ProductosExistenciaNula'
        )
        const productosNula = await responseProductosNula.json()

        let notificacionesExistentes = []
        try {
          const responseNotificaciones = await fetch(
            `https://localhost:7073/inventario-service/Notificacion/Filtrar/NotificacionUsuario?email=${email}`
          )
          notificacionesExistentes = await responseNotificaciones.json()
        } catch (error) {
          console.warn(
            'No se encontraron notificaciones existentes o la respuesta no es válida:',
            error
          )
        }

        const nuevasNotificaciones = []

        for (const producto of productosBaja) {
          const {
            productoNombre,
            categoriaNombre,
            existenciaInicial,
            existenciaActual,
          } = producto

          if (existenciaActual < existenciaInicial * 0.2) {
            const cuerpo = `El producto ${productoNombre} de la categoría ${categoriaNombre} empezó con una existencia inicial de ${existenciaInicial} y ya se encuentra por debajo del 20%.`
            const notificacion = {
              titulo: `Producto ${productoNombre} con baja existencia`,
              cuerpo,
              fecha: new Date().toISOString(),
              estado: true,
              email,
            }
            const existe = notificacionesExistentes.some(
              (n) =>
                n.titulo === notificacion.titulo &&
                n.cuerpo === notificacion.cuerpo
            )

            if (!existe) {
              nuevasNotificaciones.push(notificacion)
            }
          }
        }

        for (const producto of productosNula) {
          const { productoNombre, categoriaNombre, existenciaInicial } =
            producto

          const cuerpo = `El producto ${productoNombre} de la categoría ${categoriaNombre} ya no tiene existencia.`
          const notificacion = {
            titulo: `Producto ${productoNombre} sin existencia`,
            cuerpo,
            fecha: new Date().toISOString(),
            estado: true,
            email,
          }

          const existe = notificacionesExistentes.some(
            (n) =>
              n.titulo === notificacion.titulo &&
              n.cuerpo === notificacion.cuerpo
          )

          if (!existe) {
            nuevasNotificaciones.push(notificacion)
          }
        }

        await Promise.all(
          nuevasNotificaciones.map(async (notificacion) => {
            try {
              await fetch(
                'https://localhost:7073/inventario-service/Notificacion/Agregar',
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(notificacion),
                }
              )

              await fetch('https://localhost:7062/EnviarEmail', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  to: email,
                  subject: notificacion.titulo,
                  body: notificacion.cuerpo,
                  attachments: [],
                }),
              })
            } catch (error) {
              console.error(
                'Error adding notification or sending email:',
                error
              )
            }
          })
        )
      } catch (error) {
        console.error('Error fetching products or adding notifications:', error)
      }
    }

    if (open) {
      fetchAndCreateNotifications()
    }
  }, [open, email, onNotificationCountChange])

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://localhost:7073/inventario-service/Notificacion/Filtrar/NotificacionUsuario?email=${email}`
        )
        const data = await response.json()
        const notificacionesNoLeidas = data.filter(
          (notificacion) => !notificacion.estado
        )
        setNotificaciones(
          data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        )
        onNotificationCountChange(notificacionesNoLeidas.length)
      } catch (error) {
        console.error('Error fetching notifications:', error)
      }
    }

    if (open) {
      fetchNotifications()
    }
  }, [open, email, onNotificationCountChange])

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isNotificaciones = event.target.closest('.bg-slate-100')
      if (open && !isNotificaciones) {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [open, onClose])

  const handleNotificationClick = async (id) => {
    try {
      await fetch(
        `https://localhost:7073/inventario-service/Notificacion/ActualizarEstado?id=${id}&email=${email}`,
        {
          method: 'PUT',
        }
      )

      setNotificaciones((prevNotificaciones) =>
        prevNotificaciones.map((notificacion) =>
          notificacion.id === id
            ? { ...notificacion, estado: true }
            : notificacion
        )
      )
    } catch (error) {
      console.error('Error updating notification status:', error)
    }
  }

  if (!open) return null

  return (
    <div className='absolute flex-col w-full top-0 z-10 flex items-end justify-end'>
      <div className='h-12'></div>
      <div className='mr-20 flex justify-end items-center'>
        <div className='bg-slate-100 w-96 p-4 flex flex-col gap-2 cursor-pointer rounded-lg'>
          <h1 className='text-start'>Notificaciones</h1>
          <div className='h-96 overflow-y-auto gap-3 flex flex-col'>
            {notificaciones.map((notificacion, index) => (
              <div
                key={index}
                onClick={() => handleNotificationClick(notificacion.id)}
                className={`rounded-lg p-3 flex flex-col ${
                  notificacion.estado ? 'bg-slate-50' : 'bg-gray-200'
                } hover:bg-slate-300`}
              >
                <div className='self-end text-gray-400 text-sm'>
                  {new Date(notificacion.fecha).toLocaleDateString()}
                </div>
                <div className='font-bold text-sm'>{notificacion.titulo}</div>
                <div className='mt-2 text-sm'>{notificacion.cuerpo}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalVerNotificaciones
