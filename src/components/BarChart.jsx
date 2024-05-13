import { useState, useEffect } from 'react'
import { BarChart } from '@tremor/react'

const BarChartGanancias = ({ color }) => {
  const [data, setData] = useState([])

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
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchData()
  }, [])

  const dataFormatter = (number) =>
    Intl.NumberFormat('us').format(number).toString()

  return (
    <>
      <h3
        className={`text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong`}
      >
        Ganancia por productos
      </h3>
      <BarChart
        className='mt-6'
        data={data.map((item) => ({
          name: item.nombreProducto,
          Ganancia: item.ganancia,
        }))}
        index='name'
        categories={['Ganancia']}
        colors={['green']}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  )
}

export default BarChartGanancias
