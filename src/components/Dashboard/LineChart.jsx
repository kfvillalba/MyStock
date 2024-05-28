import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto' //Se usa no borrar xd

const LineComprasVentas = ({ color }) => {
  const [ventasData, setVentasData] = useState([])
  const [comprasData, setComprasData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchVentasData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Dashboard/Grafica/VentasPorMes'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch ventas data')
        }
        const data = await response.json()
        setVentasData(data)
      } catch (error) {
        console.error('Error fetching ventas data:', error)
        setError(error.message)
      }
    }

    const fetchComprasData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Dashboard/Grafica/ComprasPorMes'
        )
        if (!response.ok) {
          throw new Error('Failed to fetch compras data')
        }
        const data = await response.json()
        setComprasData(data)
      } catch (error) {
        console.error('Error fetching compras data:', error)
        setError(error.message)
      }
    }

    fetchVentasData()
    fetchComprasData()
  }, [])

  let labels = []
  let ventas = []
  let compras = []

  if (!error) {
    labels = ventasData.map((item) => item.mes)
    ventas = ventasData.map((item) => item.cantidadSalidas)
    compras = comprasData.map((item) => item.cantidadEntradas)
  } else {
    for (let i = 1; i <= 12; i++) {
      labels.push(`Mes ${i}`)
      ventas.push(Math.floor(Math.random() * 100) + 50)
      compras.push(Math.floor(Math.random() * 100) + 50)
    }
  }

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
        text: 'Ventas vs Compras',
      },
    },
  }

  return (
    <div className='w-2/3 h-96 p-5 shadow-md shadow-gray-300 bg-[#ffffff] flex justify-center items-center'>
      <Line data={data} options={options} />
    </div>
  )
}

export default LineComprasVentas
