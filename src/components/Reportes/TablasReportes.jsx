import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import {
  fetchVentasReport,
  fetchCienteSalidasReport,
  fetchComprasReport,
  fetchEntradaProveedorReport,
  fetchProductosVendidosReport,
  fetchClienteSalidaActualReport,
  fetchProductosSalidaActualReport,
  fetchProductosbajaExistenciaReport,
  fetchProductosExistencia0Report,
} from '../Fetchs/fetchReportes'

export async function generateVentasPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchVentasReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(`Reporte de Ventas`, doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha Factura', styles: { halign: 'center' } },
          { content: 'Nombre Cliente', styles: { halign: 'center' } },
          { content: 'Cantidad Productos', styles: { halign: 'center' } },
          { content: 'Total con Descuento', styles: { halign: 'center' } },
          { content: 'Total sin Descuento', styles: { halign: 'center' } },
          { content: 'Total Descuento', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaFactura, styles: { halign: 'center' } },
        { content: row.clienteNombre, styles: { halign: 'center' } },
        { content: row.cantidadProductos, styles: { halign: 'center' } },
        { content: row.totalPagarConDescuento, styles: { halign: 'center' } },
        { content: row.totalPagarSinDescuento, styles: { halign: 'center' } },
        { content: row.totalDescuento, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateSalidaClientesPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchCienteSalidasReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Cliente Salidas',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha Factura', styles: { halign: 'center' } },
          { content: 'Nombre Cliente', styles: { halign: 'center' } },
          { content: 'ID del Cliente', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaFactura, styles: { halign: 'center' } },
        { content: row.clienteNombre, styles: { halign: 'center' } },
        { content: row.clienteId, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateComprasPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchComprasReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text('Reporte de Compras', doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Categoria', styles: { halign: 'center' } },
          { content: 'Producto', styles: { halign: 'center' } },
          { content: 'Proveedor', styles: { halign: 'center' } },
          { content: 'Existencia Inicial', styles: { halign: 'center' } },
          { content: 'Existencia Actual', styles: { halign: 'center' } },
          { content: 'Precio Compra', styles: { halign: 'center' } },
          { content: 'Precio Venta', styles: { halign: 'center' } },
          { content: 'Fecha Entrada', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.nombreCategoria, styles: { halign: 'center' } },
        { content: row.nombreProducto, styles: { halign: 'center' } },
        { content: row.nombreProveedor, styles: { halign: 'center' } },
        { content: row.existenciaInicial, styles: { halign: 'center' } },
        { content: row.existenciaActual, styles: { halign: 'center' } },
        { content: row.precioCompra, styles: { halign: 'center' } },
        { content: row.precioVenta, styles: { halign: 'center' } },
        { content: row.fechaEntrada, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateEntradaProveedoresPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchEntradaProveedorReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Entrada de Proveedores',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'id Proveedor', styles: { halign: 'center' } },
          { content: 'Proveedor', styles: { halign: 'center' } },
          { content: 'Fecha Entrada', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.idProveedor, styles: { halign: 'center' } },
        { content: row.nombreProveedor, styles: { halign: 'center' } },
        { content: row.fechaEntrada, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateProductosVendidosPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchProductosVendidosReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Productos Vendidos',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha factura', styles: { halign: 'center' } },
          { content: 'Producto', styles: { halign: 'center' } },
          { content: 'Categoria', styles: { halign: 'center' } },
          { content: 'Precio ', styles: { halign: 'center' } },
          { content: 'Cantidad', styles: { halign: 'center' } },
          { content: 'Descuento', styles: { halign: 'center' } },
          { content: 'Valor con Desc', styles: { halign: 'center' } },
          { content: 'Total a pagar', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaFactura, styles: { halign: 'center' } },
        { content: row.productoNombre, styles: { halign: 'center' } },
        { content: row.categoriaNombre, styles: { halign: 'center' } },
        { content: row.precio, styles: { halign: 'center' } },
        { content: row.cantidad, styles: { halign: 'center' } },
        { content: row.descuento, styles: { halign: 'center' } },
        { content: row.valorDescuento, styles: { halign: 'center' } },
        { content: row.total, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

// ----------------------------------------------------------------------------------------------------------
export async function generateSalidaClientesActualPDF(data) {
  try {
    const responseData = await fetchClienteSalidaActualReport(data)
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Cliente Salidas Día Actual',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha Factura', styles: { halign: 'center' } },
          { content: 'Nombre Cliente', styles: { halign: 'center' } },
          { content: 'ID del Cliente', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaFactura, styles: { halign: 'center' } },
        { content: row.clienteNombre, styles: { halign: 'center' } },
        { content: row.clienteId, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateProductosSalidaActualPDF(data) {
  try {
    const responseData = await fetchProductosSalidaActualReport(data)
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES') // Obtiene la fecha actual en formato DD/MM/YYYY
    doc.setFontSize(18)
    doc.text(
      'Productos Salidas Día Actual',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha factura', styles: { halign: 'center' } },
          { content: 'Producto', styles: { halign: 'center' } },
          { content: 'Categoria', styles: { halign: 'center' } },
          { content: 'Precio ', styles: { halign: 'center' } },
          { content: 'Cantidad', styles: { halign: 'center' } },
          { content: 'Descuento', styles: { halign: 'center' } },
          { content: 'Valor con Desc', styles: { halign: 'center' } },
          { content: 'Total a pagar', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: fechaActual, styles: { halign: 'center' } },
        { content: row.productoNombre, styles: { halign: 'center' } },
        { content: row.categoriaNombre, styles: { halign: 'center' } },
        { content: row.precio, styles: { halign: 'center' } },
        { content: row.cantidad, styles: { halign: 'center' } },
        { content: row.descuento, styles: { halign: 'center' } },
        { content: row.valorDescuento, styles: { halign: 'center' } },
        { content: row.total, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

// ----------------------------------------------------------------------------------------------------------

export async function generateProductosBajaExistenciaPDF() {
  try {
    const responseData = await fetchProductosbajaExistenciaReport()
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Productos Con Baja Existencia',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha factura', styles: { halign: 'center' } },
          { content: 'Categoria', styles: { halign: 'center' } },
          { content: 'Producto', styles: { halign: 'center' } },
          { content: 'Proveedor ', styles: { halign: 'center' } },
          { content: 'Existencia inicial ', styles: { halign: 'center' } },
          { content: 'Existencia actual', styles: { halign: 'center' } },
          { content: 'Precio Compra', styles: { halign: 'center' } },
          { content: 'Precio Venta', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaEntrada, styles: { halign: 'center' } },
        { content: row.categoriaNombre, styles: { halign: 'center' } },
        { content: row.productoNombre, styles: { halign: 'center' } },
        { content: row.proveedorNombre, styles: { halign: 'center' } },
        { content: row.existenciaInicial, styles: { halign: 'center' } },
        { content: row.existenciaActual, styles: { halign: 'center' } },
        { content: row.precioCompra, styles: { halign: 'center' } },
        { content: row.precioVenta, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

// -------------------------------------------------------------------------------------------

export async function generateProductosExistencia0PDF() {
  try {
    const responseData = await fetchProductosExistencia0Report()
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text(
      'Reporte de Productos Con Existencia 0',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
          { content: 'Fecha factura', styles: { halign: 'center' } },
          { content: 'Categoria', styles: { halign: 'center' } },
          { content: 'Producto', styles: { halign: 'center' } },
          { content: 'Proveedor ', styles: { halign: 'center' } },
          { content: 'Existencia inicial ', styles: { halign: 'center' } },
          { content: 'Existencia actual', styles: { halign: 'center' } },
          { content: 'Precio Compra', styles: { halign: 'center' } },
          { content: 'Precio Venta', styles: { halign: 'center' } },
        ],
      ],
      body: responseData.map((row) => [
        { content: row.fechaEntrada, styles: { halign: 'center' } },
        { content: row.categoriaNombre, styles: { halign: 'center' } },
        { content: row.productoNombre, styles: { halign: 'center' } },
        { content: row.proveedorNombre, styles: { halign: 'center' } },
        { content: row.existenciaInicial, styles: { halign: 'center' } },
        { content: row.existenciaActual, styles: { halign: 'center' } },
        { content: row.precioCompra, styles: { halign: 'center' } },
        { content: row.precioVenta, styles: { halign: 'center' } },
      ]),
      startY: 25,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}
