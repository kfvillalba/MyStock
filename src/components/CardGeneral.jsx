import React from "react";
import { Card, Metric, Text } from "@tremor/react";
import ClienteIcon from "../assets/ClienteIcon";

export function CardGeneral({ nombre, logo, cantidad }) {
  return (
    <Card
      className="mx-auto mt-0 max-w-xs cardStyle w-[240px] h-[80px] mt-0 p-2 ml-0"
      decoration="top"
      decorationColor="indigo"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">
            {nombre}
          </p>
          <p className="text-3xl text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {cantidad}
          </p>
        </div>
        {logo}
      </div>
    </Card>
  );
}
