import React, { useEffect, useState } from 'react'
import { BarChart } from '@tremor/react'

const dataFormatter = (number) =>
  Intl.NumberFormat('us').format(number).toString()

export const ClientsBar = ({ color }) => {
  const [apiData, setApiData] = useState([])

  useEffect(() => {
    fetch(
      'https://localhost:7073/inventario-service/Dashboard/Grafica/ConsultarClienteSalidas'
    )
      .then((response) => response.json())
      .then((data) => setApiData(data))
      .catch((error) => console.error('Error fetching data: ', error))
  }, [])

  return (
    <BarChart
      className={`max-w-lg barStyle ${color}`}
      data={apiData}
      index='nombreCliente'
      categories={['cantidadSalidas']}
      colors={['#1f2937']}
      valueFormatter={dataFormatter}
      yAxisWidth={48}
      onValueChange={(v) => console.log(v)}
    />
  )
}
