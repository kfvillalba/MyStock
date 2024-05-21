import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto' // Importar Chart.js de esta manera en React

const LineComprasVentas = ({ color }) => {
  const [ventasData, setVentasData] = useState([])
  const [comprasData, setComprasData] = useState([])

  useEffect(() => {
    // Función para obtener datos de la API de ventas
    const fetchVentasData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7113/api/Dashboard/Grafica/VentasPorMes'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch ventas data')
        }
        const data = await response.json()
        setVentasData(data)
      } catch (error) {
        console.error('Error fetching ventas data:', error)
      }
    }

    // Función para obtener datos de la API de compras
    const fetchComprasData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7113/api/Dashboard/Grafica/ComprasPorMes'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch compras data')
        }
        const data = await response.json()
        setComprasData(data)
      } catch (error) {
        console.error('Error fetching compras data:', error)
      }
    }

    // Llamar a las funciones de obtención de datos al montar el componente
    fetchVentasData()
    fetchComprasData()
  }, [])

  // Procesar los datos para usarlos en el gráfico
  const labels = ventasData.map((item) => item.mes)
  const ventas = ventasData.map((item) => item.cantidadSalidas)
  const compras = comprasData.map((item) => item.cantidadEntradas)

  const data = {
    labels,
    datasets: [
      {
        label: 'Compras',
        data: compras,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Ventas',
        data: ventas,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ganancia por productos',
      },
    },
  }

  return (
    <div className='bg-[#ffffff]'>
      <Line className='w-[1035px] h-[380px]' data={data} options={options} />
    </div>
  )
}

export default LineComprasVentas
