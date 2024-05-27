import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

const BarChartGanancias = ({ color }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Dashboard/Grafica/GananciaPorProducto'
        )
        if (!response.ok) {
          throw new Error('Error al obtener los datos')
        }
        const jsonData = await response.json()
        setData(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Ganancia por productos',
      },
    },
    scales: {
      x: {
        display: false,
      },
    },
  }

  const randomColor = () => {
    const r = Math.floor(Math.random() * 256)
    const g = Math.floor(Math.random() * 256)
    const b = Math.floor(Math.random() * 256)
    return `rgba(${r},${g},${b},0.5)`
  }

  const generateRandomData = () => {
    const randomData = []
    for (let i = 0; i < 10; i++) {
      randomData.push({
        nombreProducto: `Producto ${i}`,
        ganancia: Math.floor(Math.random() * 1000000),
      })
    }
    return randomData
  }

  let chartData
  if (isLoading) {
    chartData = {
      labels: [],
      datasets: [
        {
          label: 'Ganancia',
          data: [],
          backgroundColor: [],
        },
      ],
    }
  } else {
    const labels = data.map((item) => item.nombreProducto)
    const ganancias = data.map((item) => item.ganancia)
    const backgroundColors = data.map(() => randomColor())

    chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Ganancia',
          data: ganancias,
          backgroundColor: backgroundColors,
        },
      ],
    }
  }

  return (
    <div className=' h-96 w-full p-2 bg-[#ffffff] shadow-md shadow-gray-300'>
      <Bar data={chartData} options={options} />
    </div>
  )
}

export default BarChartGanancias
