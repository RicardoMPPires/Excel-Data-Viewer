'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface IndicatorsChartProps {
  title: string;
  data: Record<string, number>;
}

export const IndicatorsChart: React.FC<IndicatorsChartProps> = ({ title, data }) => {
  // Convert object into array for Recharts
  const chartData = Object.entries(data).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="bg-white border shadow-md rounded-lg p-4 flex-1 min-w-[250px]">
      <h3 className="text-green-700 font-bold text-lg mb-2">{title}</h3>
      {chartData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#16a34a" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
