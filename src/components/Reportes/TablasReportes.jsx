import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import {
  fetchVentasReport,
  fetchCienteSalidasReport,
  fetchComprasReport,
  fetchEntradaProveedorReport,
  fetchProductosVendidosReport,
  fetchVentasActualReport,
  fetchClienteSalidaActualReport,
  fetchComprasActualReport,
  fetchProductosSalidaActualReport,
  fetchEntradaProveedoresActualReport,
  fetchProductosbajaExistenciaReport,
  fetchProductosExistencia0Report,
} from '../Fetchs/fetchReportes'

async function fetchEmpresaData() {
  const response = await fetch(
    `https://localhost:7113/api/Empresas/Filtrar/EmpresaUsuario?email=${localStorage.getItem(
      'email'
    )}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const data = await response.json()
  return data
}
// --------------------------Entre fechas--------------------------------------------------
export async function generateVentasPDF(data) {
  const { fechaInicio, fechaFinal } = data
  try {
    const responseData = await fetchVentasReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )

    doc.setFontSize(18)
    doc.text(`Reporte de Ventas`, doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      45,
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
      startY: 50,
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
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
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
      45,
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
      startY: 50,
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
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.setFontSize(18)
    doc.text('Reporte de Compras', doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
    doc.setFontSize(12)
    doc.text(
      `Desde: ${fechaInicio}   Hasta: ${fechaFinal}`,
      doc.internal.pageSize.getWidth() / 2,
      45,
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
      startY: 50,
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

    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
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
      45,
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
      startY: 50,
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
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
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
      45,
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
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

// -------------------------------Día actual---------------------------------------------------------------------------
export async function generateVentasActualPDF(data) {
  try {
    const responseData = await fetchVentasActualReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES')
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.text(`${fechaActual}`, doc.internal.pageSize.getWidth() / 2, 45, {
      align: 'center',
    })

    doc.setFontSize(18)
    doc.text(`Reporte de Ventas`, doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })
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
        { content: fechaActual, styles: { halign: 'center' } },
        { content: row.clienteNombre, styles: { halign: 'center' } },
        { content: row.cantidadProductos, styles: { halign: 'center' } },
        { content: row.totalPagarConDescuento, styles: { halign: 'center' } },
        { content: row.totalPagarSinDescuento, styles: { halign: 'center' } },
        { content: row.totalDescuento, styles: { halign: 'center' } },
      ]),
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateSalidaClientesActualPDF(data) {
  try {
    const responseData = await fetchClienteSalidaActualReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES')
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.text(`${fechaActual}`, doc.internal.pageSize.getWidth() / 2, 45, {
      align: 'center',
    })
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
        { content: fechaActual, styles: { halign: 'center' } },
        { content: row.clienteNombre, styles: { halign: 'center' } },
        { content: row.clienteId, styles: { halign: 'center' } },
      ]),
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateComprasActualPDF(data) {
  try {
    const responseData = await fetchComprasActualReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES')
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.text(`${fechaActual}`, doc.internal.pageSize.getWidth() / 2, 45, {
      align: 'center',
    })
    doc.setFontSize(18)
    doc.text(`Reporte de Compras`, doc.internal.pageSize.getWidth() / 2, 15, {
      align: 'center',
    })

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
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateEntradaProveedoresActualPDF(data) {
  try {
    const responseData = await fetchEntradaProveedoresActualReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES')
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.text(`${fechaActual}`, doc.internal.pageSize.getWidth() / 2, 45, {
      align: 'center',
    })
    doc.setFontSize(18)
    doc.text(
      `Reporte de Proveedores`,
      doc.internal.pageSize.getWidth() / 2,
      15,
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
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateProductosSalidaActualPDF(data) {
  try {
    const responseData = await fetchProductosSalidaActualReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const fechaActual = new Date().toLocaleDateString('es-ES')
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
    doc.text(`${fechaActual}`, doc.internal.pageSize.getWidth() / 2, 45, {
      align: 'center',
    })
    doc.setFontSize(18)
    doc.text(
      'Reporte Producto Salidas',
      doc.internal.pageSize.getWidth() / 2,
      15,
      {
        align: 'center',
      }
    )
    doc.autoTable({
      head: [
        [
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
        { content: row.productoNombre, styles: { halign: 'center' } },
        { content: row.categoriaNombre, styles: { halign: 'center' } },
        { content: row.precio, styles: { halign: 'center' } },
        { content: row.cantidad, styles: { halign: 'center' } },
        { content: row.descuento, styles: { halign: 'center' } },
        { content: row.valorDescuento, styles: { halign: 'center' } },
        { content: row.total, styles: { halign: 'center' } },
      ]),
      startY: 50,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

// ------------------------------información de productos-------------------------------------------------

export async function generateProductosBajaExistenciaPDF(data) {
  try {
    const responseData = await fetchProductosbajaExistenciaReport(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )
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
      startY: 47,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}

export async function generateProductosExistencia0PDF(data) {
  try {
    const responseData = await fetchProductosExistencia0Report(data)
    const empresaDataArray = await fetchEmpresaData()
    const empresaData = empresaDataArray[0]
    const doc = new jsPDF()
    const imgData = 'src/assets/en-stock.png'
    doc.addImage(imgData, 'JPEG', 15, 10, 20, 20)
    doc.setFontSize(12)
    doc.text(
      `${empresaData.nombre}`,
      doc.internal.pageSize.getWidth() / 2,
      22,
      {
        align: 'center',
      }
    ),
      doc.text(
        `${empresaData.direccion}`,
        doc.internal.pageSize.getWidth() / 2,
        28,
        {
          align: 'center',
        }
      )
    doc.text(
      `${empresaData.telefono}`,
      doc.internal.pageSize.getWidth() / 2,
      34,
      {
        align: 'center',
      }
    )

    doc.setFontSize(18)
    doc.text(
      'Reporte de Productos Con Existencia Cero(0)',
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
      startY: 47,
    })
    return doc.output('bloburl')
  } catch (error) {
    throw error
  }
}
