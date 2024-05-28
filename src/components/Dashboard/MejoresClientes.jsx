import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

const UtilidadProductos = ({ color }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Top 5 Productos Vendidos',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  })

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        align: 'center',
        display: false,
        labels: {
          boxWidth: 20,
          padding: 10,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'CATEGORIAS',
      },
    },
  }

  useEffect(() => {
    fetch(
      'https://localhost:7073/inventario-service/Dashboard/Grafica/ConsultarCategoriaProductos'
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        const labels = data.map((item) => item.nombreCategoria)
        const chartData = data.map((item) => item.cantidadProductos)
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Cantidad de Ventas',
              data: chartData,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 255, 0.2)',
                'rgba(54, 162, 155, 0.2)',
                'rgba(153, 102, 155, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 205, 86, 1)',
                'rgba(75, 192, 255, 1)',
                'rgba(54, 162, 155, 1)',
                'rgba(153, 102, 155, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
      })
      .catch((error) => {
        console.error('Error fetching data:', error)

        setChartData({
          labels: [
            'Producto A',
            'Producto B',
            'Producto C',
            'Producto D',
            'Producto E',
          ],
          datasets: [
            {
              label: 'Cantidad de Ventas',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        })
      })
  }, [])

  return (
    <div className='h-96 w-1/3 bg-[#ffffff] p-4 flex justify-center items-center shadow-md shadow-gray-300'>
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default UtilidadProductos