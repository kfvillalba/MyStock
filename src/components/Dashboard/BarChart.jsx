import { useState, useEffect } from 'react'
import { Bar } from 'react-chartjs-2'

const BarChartGanancias = ({ color }) => {
  const [data, setData] = useState([])
  const [data2, setData2] = useState([])
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
    const fetchData2 = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Dashboard/Grafica/TodosLosProductosConVentas'
        )
        if (!response.ok) {
          throw new Error('Error al obtener los datos')
        }
        const jsonData = await response.json()
        setData2(jsonData)
        setIsLoading(false)
      } catch (error) {
        console.error('Error:', error)
        setIsLoading(false)
      }
    }

    fetchData()
    fetchData2()
  }, [])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
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
    const productos = data2.map((item) => item.cantidadVentas)
    const backgroundColors = data.map(() => randomColor())
    const backgroundColors2 = data2.map(() => randomColor())

    chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Ganancia por producto',
          data: ganancias,
          backgroundColor: backgroundColors,
        },
        {
          label: 'productos con ventas',
          data: productos,
          backgroundColor: backgroundColors2,
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
