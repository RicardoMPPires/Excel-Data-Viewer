import React from 'react';

interface AverageEnergyPerCompanyTableProps {
  data: Record<string, number>;
}

export const AverageEnergyPerCompanyTable: React.FC<AverageEnergyPerCompanyTableProps> = ({
  data,
}) => {
  const rows = Object.entries(data)
    .map(([company, value]) => ({ company, value }))
    .sort((a, b) => b.value - a.value); // optional: sort descending

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full text-black">
      <h2 className="text-lg font-semibold mb-4 text-green-700">
        ⚡ Average Energy Consumption per Company
      </h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-green-100 text-left text-gray-700">
            <th className="p-2">Company</th>
            <th className="p-2 text-right">Average Energy (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.company} className="border-b border-gray-100">
              <td className="p-2">{row.company}</td>
              <td className="p-2 text-right">{row.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
