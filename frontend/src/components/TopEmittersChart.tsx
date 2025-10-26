import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

interface TopEmittersChartProps {
  data: { companyName: string; emissions: number }[];
}

export const TopEmittersChart: React.FC<TopEmittersChartProps> = ({ data }) => {
  // ✅ Convert backend data into Recharts format
  const chartData = data.map((item) => ({
    name: item.companyName,
    value: item.emissions,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        🌿 Top 5 Companies with highest CO₂ Emissions
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" angle={-30} textAnchor="end" interval={0} height={60} />
          <YAxis />
          <Tooltip formatter={(value: number) => `${value.toFixed(2)} tCO₂`} />
          <Bar dataKey="value" fill="#16a34a" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
