import { useState, useEffect } from 'react'
import { AreaChart } from '@tremor/react'

export function VentasGraf(color) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://localhost:7073/inventario-service/Dashboard/Grafica/VentasPorMes'
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

  const customTooltip = (props) => {
    const { payload, active } = props
    if (!active || !payload) return null
    return (
      <div className='rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown cardList'>
        {payload.map((category, idx) => (
          <div key={idx} className='flex flex-1 space-x-2.5'>
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className='space-y-1'>
              <p className='text-tremor-content'>{category.dataKey}</p>
              <p className='font-medium text-tremor-content-emphasis'>
                {category.value} ventas
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <>
      <AreaChart
        className={'max-w-lg bg-[#fefefe]'}
        data={data.map((item) => ({
          date: item.mes,
          ventas: item.cantidadSalidas,
        }))}
        index='date'
        categories={['ventas']}
        colors={['green']}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </>
  )
}
