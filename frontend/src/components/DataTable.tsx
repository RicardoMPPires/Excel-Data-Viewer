'use client';

import { useState } from 'react';

interface DataTableProps {
  data: any[];
}

const COLUMN_MAP: Record<string, string> = {
  companyName: 'Empresa',
  year: 'Ano',
  sector: 'Setor',
  energyConsumption: 'Consumo de Energia (MWh)',
  carbonEmissions: 'Emissões de CO2 (toneladas)',
};

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  if (!data || data.length === 0) return <p className="text-center mt-4">No data to display</p>;

  const columns = Object.keys(data[0]);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <button
        onClick={() => setExpanded(!expanded)}
        className="mb-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition-colors"
      >
        {expanded ? 'Hide data' : 'See all data'}
      </button>

      {expanded && (
        <div className="overflow-auto shadow-lg rounded-lg border bg-white text-black">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="px-4 py-2 text-left">#</th>
                {columns.map((col) => (
                  <th key={col} className="px-4 py-2 text-left text-sm font-medium uppercase">
                    {COLUMN_MAP[col] || col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.map((row, idx) => (
                <tr key={idx} className="hover:bg-green-50">
                  <td className="px-4 py-2">{idx + 1}</td>
                  {columns.map((col) => (
                    <td key={col} className="px-4 py-2 text-sm">
                      {row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
