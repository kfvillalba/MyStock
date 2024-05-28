import React, { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'

const TopVendidos = ({ color }) => {
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
        labels: {
          boxWidth: 20,
          padding: 10,
          usePointStyle: true,
        },
      },
      title: {
        display: true,
        text: 'Top 5',
        align: 'start',
      },
    },
  }

  const [dataURL, setDataURL] = useState(
    'https://localhost:7073/inventario-service/Dashboard/Grafica/TopProductosMasVendidos'
  )

  useEffect(() => {
    fetch(dataURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        return response.json()
      })
      .then((data) => {
        let labels, chartData
        if (dataURL.includes('TopProductosMasVendidos')) {
          labels = data.map((item) => item.nombreProducto)
          chartData = data.map((item) => item.cantidadVentas)
        } else if (dataURL.includes('TopMejoresClientes')) {
          labels = data.map((item) => item.nombreCliente)
          chartData = data.map((item) => item.cantidadCompras)
        }
        setChartData({
          labels: labels,
          datasets: [
            {
              label: dataURL.includes('TopProductosMasVendidos')
                ? 'Cantidad de Ventas'
                : 'Cantidad de Compras',
              data: chartData,
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
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [dataURL])

  const [selectedButton, setSelectedButton] = useState('productos')

  return (
    <div className='relative h-96 w-1/3 p-2 bg-[#ffffff] justify-center items-center shadow-md shadow-gray-300'>
      <div className='absolute ml-52 rounded'>
        <div
          className='flex space-x-1 rounded-lg bg-slate-100 p-1 text-xs'
          role='tablist'
          aria-orientation='horizontal'
        >
          <button
            className={`flex items-center rounded-md py-[0.125rem] pl-[0.375rem] pr-[0.375rem] text-xs font-semibold lg:pr-[0.25rem] ${
              selectedButton === 'productos' ? 'bg-white' : ''
            }`}
            onClick={() => {
              setDataURL(
                'https://localhost:7073/inventario-service/Dashboard/Grafica/TopProductosMasVendidos'
              )
              setSelectedButton('productos')
            }}
          >
            Productos
          </button>
          <button
            className={`flex items-center rounded-md py-[0.125rem] pl-[0.375rem] pr-[0.375rem] text-xs font-semibold lg:pr-[0.25rem] ${
              selectedButton === 'clientes' ? 'bg-white' : ''
            }`}
            onClick={() => {
              setDataURL(
                'https://localhost:7073/inventario-service/Dashboard/Grafica/TopMejoresClientes'
              )
              setSelectedButton('clientes')
            }}
          >
            Clientes
          </button>
        </div>
      </div>
      <Doughnut data={chartData} options={options} />
    </div>
  )
}

export default TopVendidos
