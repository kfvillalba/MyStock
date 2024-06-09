// ------------------------------Fechas---------------------------------------------------

export async function fetchVentasReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/VentasEntreDosFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.clienteId !== '-1') {
        const clienteId = parseInt(data.clienteId)
        filteredData = responseData.filter(
          (venta) => venta.clienteId === clienteId
        )
      }
      const formattedData = filteredData.map((venta) => {
        return {
          ...venta,
          fechaFactura: new Date(venta.fechaFactura).toLocaleDateString(
            'es-ES',
            {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }
          ),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchCienteSalidasReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ClientesSalidasEntreFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.clienteId !== '-1') {
        const clienteId = parseInt(data.clienteId)
        filteredData = responseData.filter(
          (venta) => venta.clienteId === clienteId
        )
      }
      console.log(filteredData)
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaFactura: new Date(row.fechaFactura).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchComprasReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ComprasEntreFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.idCategoria !== '-1') {
        const idCategoria = parseInt(data.idCategoria)
        filteredData = responseData.filter(
          (venta) => venta.idCategoria === idCategoria
        )
      }

      if (data.idProducto !== '-1') {
        const idProducto = parseInt(data.idProducto)
        filteredData = filteredData.filter(
          (compra) => compra.idProducto === idProducto
        )
      }

      if (data.idProveedor !== '-1') {
        const idProveedor = parseInt(data.idProveedor)
        filteredData = filteredData.filter(
          (compra) => compra.idProveedor === idProveedor
        )
      }

      const formattedData = filteredData.map((row) => {
        return {
          ...row,
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchEntradaProveedorReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProveedoresEntradasEntreFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.idProveedor !== '-1') {
        const idProveedor = parseInt(data.idProveedor)
        filteredData = filteredData.filter(
          (compra) => compra.idProveedor === idProveedor
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchProductosVendidosReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProdcutosVendidosEntreFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData

      if (data.idCategoria !== '-1') {
        const categoriaId = parseInt(data.idCategoria)
        filteredData = responseData.filter(
          (venta) => venta.categoriaId === categoriaId
        )
      }

      if (data.idProducto !== '-1') {
        const productoId = parseInt(data.idProducto)
        filteredData = filteredData.filter(
          (compra) => compra.productoId === productoId
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaFactura: new Date(row.fechaFactura).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
// ---------------------------------Dia actual-------------------------------------------------------------------------
export async function fetchVentasActualReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/VentasDiaActual`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.clienteId !== '-1') {
        const clienteId = parseInt(data.clienteId)
        filteredData = responseData.filter(
          (venta) => venta.clienteId === clienteId
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaFactura: new Date(row.fechaFactura).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchClienteSalidaActualReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ClientesSalidasDiaActual`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.clienteId !== '-1') {
        const clienteId = parseInt(data.clienteId)
        filteredData = responseData.filter(
          (venta) => venta.clienteId === clienteId
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaFactura: new Date(row.fechaFactura).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchComprasActualReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ComprasDiaActual`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.idCategoria !== '-1') {
        const idCategoria = parseInt(data.idCategoria)
        filteredData = responseData.filter(
          (venta) => venta.idCategoria === idCategoria
        )
      }

      if (data.idProducto !== '-1') {
        const idProducto = parseInt(data.idProducto)
        filteredData = filteredData.filter(
          (compra) => compra.idProducto === idProducto
        )
      }

      if (data.idProveedor !== '-1') {
        const idProveedor = parseInt(data.idProveedor)
        filteredData = filteredData.filter(
          (compra) => compra.idProveedor === idProveedor
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaFactura: new Date(row.fechaFactura).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchEntradaProveedoresActualReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProveedoresEntradasDiaActual`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData
      if (data.idProveedor !== '-1') {
        const idProveedor = parseInt(data.idProveedor)
        filteredData = filteredData.filter(
          (compra) => compra.idProveedor === idProveedor
        )
      }
      const formattedData = filteredData.map((row) => {
        return {
          ...row,
          fechaEntrada: new Date(row.fechaEntrada).toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          }),
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchProductosSalidaActualReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProductosSalidaDiaActual`
    )
    if (response.ok) {
      const responseData = await response.json()
      let filteredData = responseData

      if (data.idCategoria !== '-1') {
        const categoriaId = parseInt(data.idCategoria)
        filteredData = responseData.filter(
          (venta) => venta.categoriaId === categoriaId
        )
      }

      if (data.idProducto !== '-1') {
        const productoId = parseInt(data.idProducto)
        filteredData = filteredData.filter(
          (compra) => compra.productoId === productoId
        )
      }

      const formattedData = filteredData.map((row) => {
        return {
          ...row,
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

// -----------------------------------Información de productos-----------------------------------------------------------------------

export async function fetchProductosbajaExistenciaReport() {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProductosBajaExistencia`
    )
    if (response.ok) {
      const responseData = await response.json()
      const formattedData = responseData.map((row) => {
        return {
          ...row,
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function fetchProductosExistencia0Report() {
  try {
    const response = await fetch(
      `https://localhost:7073/inventario-service/Reportes/ProductosExistenciaNula`
    )
    if (response.ok) {
      const responseData = await response.json()
      const formattedData = responseData.map((row) => {
        return {
          ...row,
        }
      })
      return formattedData
    } else {
      throw new Error('Error al enviar la solicitud')
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}

export default fetchProductosExistencia0Report
