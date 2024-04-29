import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Jeison",
    "Compras realizadas": 2488,
  },
  {
    name: "Kevin",
    "Compras realizadas": 1445,
  },
  {
    name: "Alberto",
    "Compras realizadas": 743,
  },
  {
    name: "Brayan",
    "Compras realizadas": 281,
  },
  {
    name: "Yuman",
    "Compras realizadas": 251,
  },
  {
    name: "Quiroz",
    "Compras realizadas": 232,
  },
  {
    name: "Daniel",
    "Compras realizadas": 98,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

export const ClientsBar = ({ color }) => (
  <BarChart
    className={`max-w-lg barStyle ${color}`}
    data={chartdata}
    index="name"
    categories={["Compras realizadas"]}
    colors={["#1f2937"]}
    valueFormatter={dataFormatter}
    yAxisWidth={48}
    onValueChange={(v) => console.log(v)}
  />
);
