export async function fetchVentasReport(data) {
  try {
    const response = await fetch(
      `https://localhost:7113/api/Reportes/VentasEntreDosFechas?fechaInicio=${data.fechaInicio}&fechaFinal=${data.fechaFinal}`
    )
    if (response.ok) {
      const responseData = await response.json()
      const formattedData = responseData.map((row) => {
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
export default fetchVentasReport
