"use client"
import React, { FC } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Shorthair",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Maine Coon",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Siamese",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "British Shorthair",
    uv: 2780,
    pv: 3908,
    amt: 2000
  }
];

interface DashboardBarChartProps {

}

const DashboardBarChart: FC<DashboardBarChartProps> = () => {

  return (
    <div className="flex justify-center">
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" stackId="a" fill="#8884d8" />
        <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default DashboardBarChart;
