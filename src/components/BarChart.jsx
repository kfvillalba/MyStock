import { BarChart } from "@tremor/react";

const chartdata = [
  {
    name: "Amphibians",
    Ganancia: 2488,
  },
  {
    name: "Birds",
    Ganancia: 1445,
  },
  {
    name: "Crustaceans",
    Ganancia: 743,
  },
  {
    name: "Ferns",
    Ganancia: 281,
  },
  {
    name: "Arachnids",
    Ganancia: 251,
  },
  {
    name: "Corals",
    Ganancia: 232,
  },
  {
    name: "Algae",
    Ganancia: 98,
  },
  {
    name: "Pan",
    Ganancia: 232,
  },
  {
    name: "Peto",
    Ganancia: 98,
  },
];

const dataFormatter = (number) =>
  Intl.NumberFormat("us").format(number).toString();

const BarChartGanancias = ({ color }) => {
  return (
    <>
      <h3
        className={`text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong`}
      >
        Ganancia por productos
      </h3>
      <BarChart
        className="mt-6"
        data={chartdata}
        index="name"
        categories={["Ganancia"]}
        colors={["green"]}
        valueFormatter={dataFormatter}
        yAxisWidth={48}
      />
    </>
  );
};

export default BarChartGanancias;
