import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { fetchVentasReport } from './fetchReportes'

export async function generateVentasPDF(data) {
  try {
    const responseData = await fetchVentasReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Reporte de Ventas', doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
    doc.autoTable({
      head: [
        [
          'Fecha Factura',
          'Nombre Cliente',
          'Cantidad Productos',
          'Total con Descuento',
          'Total sin Descuento',
          'Total Descuento',
        ],
      ],
      body: responseData.map((row) => [
        row.fechaFactura,
        row.clienteNombre,
        row.cantidadProductos,
        row.totalPagarConDescuento,
        row.totalPagarSinDescuento,
        row.totalDescuento,
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}
