'use client';

import { useState } from 'react';
import { UploadForm } from '../components/UploadForm';
import { DataTable } from '../components/DataTable';
import { Header } from '../components/Header';
import { IndicatorsChart } from '../components/IndicatorsChart';
import { ExcelUploadResponse } from '@/interfaces/response/excelUploadResponse';

export default function Home() {
  const [data, setData] = useState<ExcelUploadResponse | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <UploadForm onDataReceived={setData} />

      {data && data.indicators && (
        <div className="max-w-6xl mx-auto mt-8 p-4 flex flex-wrap gap-4">
          {data.indicators.totalCO2PerYear && (
            <IndicatorsChart
              title="Total CO2 Emissions per Year"
              data={data.indicators.totalCO2PerYear}
            />
          )}
          {data.indicators.averageEnergyPerCompany && (
            <IndicatorsChart
              title="Average Energy Consumption per Company"
              data={data.indicators.averageEnergyPerCompany}
            />
          )}
          {data.indicators.top5Emitters && (
            <IndicatorsChart
              title="Top 5 Emitters"
              data={Object.fromEntries(data.indicators.top5Emitters.map((v) => [v, 1]))}
            />
          )}
        </div>
      )}

      {data && data.data.length > 0 && <DataTable data={data.data} />}
    </main>
  );
}
