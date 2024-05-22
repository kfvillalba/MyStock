import { useState, useEffect } from 'react'
import { BarChart } from '@tremor/react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { faker } from '@faker-js/faker'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const BarChartGanancias = ({ color }) => {
  // const [data, setData] = useState([])

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         'https://localhost:7073/inventario-service/Dashboard/Grafica/GananciaPorProducto'
  //       )
  //       if (!response.ok) {
  //         throw new Error('Error al obtener los datos')
  //       }
  //       const jsonData = await response.json()
  //       setData(jsonData)
  //     } catch (error) {
  //       console.error('Error:', error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const dataFormatter = (number) =>
    Intl.NumberFormat('us').format(number).toString()

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

  const labels = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ]

  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  }

  return (
    <div className='h-[350px] w-[655px] bg-[#ffffff]'>
      <Bar className='h-[380px]' data={data} options={options} />
    </div>
  )
}

export default BarChartGanancias
