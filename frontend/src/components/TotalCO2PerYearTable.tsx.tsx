import React from 'react';

interface TotalCO2PerYearTableProps {
  data: Record<string, number>;
}

export const TotalCO2PerYearTable: React.FC<TotalCO2PerYearTableProps> = ({ data }) => {
  const rows = Object.entries(data).map(([year, value]) => ({ year, value }));

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full text-black">
      <h2 className="text-lg font-semibold mb-4 text-green-700">🌍 Total CO₂ Emissions per Year</h2>
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-green-100 text-left text-gray-700">
            <th className="p-2">Year</th>
            <th className="p-2 text-right">Total CO₂ (tons)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.year} className="border-b border-gray-100">
              <td className="p-2">{row.year}</td>
              <td className="p-2 text-right">{row.value.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
