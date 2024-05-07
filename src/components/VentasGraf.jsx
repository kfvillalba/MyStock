import { AreaChart, Card, Title } from "@tremor/react";

const chartdata = [
  {
    date: "Jan 23",
    ventas: 167,
  },
  {
    date: "Feb 23",
    ventas: 125,
  },
  {
    date: "Mar 23",
    ventas: 156,
  },
  {
    date: "Apr 23",
    ventas: 165,
  },
  {
    date: "May 23",
    ventas: 153,
  },
  {
    date: "Jun 23",
    ventas: 124,
  },
];

export function VentasGraf(color) {
  const customTooltip = (props) => {
    const { payload, active } = props;
    if (!active || !payload) return null;
    return (
      <div className="rounded-tremor-default border border-tremor-border bg-tremor-background p-2 text-tremor-default shadow-tremor-dropdown cardList">
        {payload.map((category, idx) => (
          <div key={idx} className="flex flex-1 space-x-2.5">
            <div
              className={`flex w-1 flex-col bg-${category.color}-500 rounded`}
            />
            <div className="space-y-1">
              <p className="text-tremor-content">{category.dataKey}</p>
              <p className="font-medium text-tremor-content-emphasis">
                {category.value} ventas
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <>
      <AreaChart
        className={"max-w-lg bg-[#fefefe]"}
        data={chartdata}
        index="date"
        categories={["ventas"]}
        colors={["green"]}
        yAxisWidth={30}
        customTooltip={customTooltip}
      />
    </>
  );
}
