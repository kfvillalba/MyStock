import React from 'react'

const ModalVerFactura = ({ open, onClose, salida }) => {
  if (!open) return null
  return (
    <div className='fixed w-full top-0 left-0 h-full z-10 flex items-center justify-center bg-black/50'>
      <section className='bg-white rounded-lg shadow-sm p-5 w-full mx-32'>
        <div className='p-5 shadow-md rounded-sm shadow-black h-full'>
          <h3>Factura número: {salida.id}</h3>
          <section className='flex flex-col gap-4 my-5'>
            <div className='flex flex-col'>
              <label htmlFor='cliente'>Cliente</label>
              <input
                type='text'
                disabled
                className='input__mostrar'
                defaultValue={salida.clienteNombre}
              />
            </div>

            <div className='h-3/4 overflow-y-auto snap-y shadow-sm shadow-black rounded-sm'>
              <table className='w-full table-auto '>
                <thead className='[&>tr>th]:sticky [&>tr>th]:top-0 [&>tr>th]:py-2 [&>tr>th]:bg-purple-light [&>tr>th]:text-white'>
                  <tr>
                    <th>#</th>
                    <th>Categoria</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Descuento %</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {salida.productoSalidas?.map((salida, index) => {
                    return (
                      <tr className='even:bg-slate-100 text-center' key={index}>
                        <td className='pl-3'>{salida.idSalida}</td>
                        <td>{salida.categoriaNombre}</td>
                        <td>{salida.productoNombre}</td>
                        <td>{salida.cantidad}</td>
                        <td>{salida.precio}</td>
                        <td>{salida.descuento}</td>
                        <td>{salida.total}</td>
                      </tr>
                    )
                  })}
                </tbody>
                <tfoot className='py-2'>
                  <tr className='bg-purple-light text-white [&>td]:py-2 '>
                    <td>Total</td>
                    <td></td>
                    <td></td>
                    <td>Productos: {salida.cantidadProductos}</td>
                    <td>
                      Total sin descuento: {salida.totalPagarSinDescuento}
                    </td>
                    <td>Total Descuento: {salida.totalDescuento}</td>
                    <td>Total a Pagar: {salida.totalPagarConDescuento}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </section>
          <div className='flex gap-4 justify-center'>
            <button
              onClick={() => {
                onClose()
              }}
              className='bnt__danger mt-3'
            >
              Cerrar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ModalVerFactura
