import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { CryptoInterval } from "../../types";
import { format } from "date-fns";

const PriceChart: React.FC<{ intervals: CryptoInterval[] }> = ({ intervals }) => {
  const chartData = intervals.map((interval) => ({
    time: format(new Date(interval.time), "dd.MM.yy HH:mm:ss"),
    priceUsd: (interval.priceUsd*1).toFixed(2),
  }));

  return (
    <LineChart width={1200} height={400} data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis dataKey="priceUsd" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dot={false} dataKey="priceUsd" 
      stroke="blue" name="Price $" />
    </LineChart>
  );
};

export default PriceChart;
