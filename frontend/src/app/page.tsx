'use client';

import { useState } from 'react';
import { UploadForm } from '../components/UploadForm';
import { DataTable } from '../components/DataTable';
import { Header } from '../components/Header';
import { TotalCO2PerYearTable } from '../components/TotalCO2PerYearTable.tsx';
import { ExcelUploadResponse } from '@/interfaces/response/excelUploadResponse';
import { TopEmittersChart } from '@/components/TopEmittersChart';
import { AverageEnergyPerCompanyTable } from '@/components/AverageEnergyPerCompanyTable';

export default function Home() {
  const [data, setData] = useState<ExcelUploadResponse | null>(null);

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <UploadForm onDataReceived={setData} />

      {data && data.data.length > 0 && <DataTable data={data.data} />}

      {data && data.indicators && (
        <div className="max-w-6xl mx-auto mt-8 p-4">
          {data.indicators.totalCO2PerYear && (
            <div className="mb-4">
              <TotalCO2PerYearTable data={data.indicators.totalCO2PerYear} />
            </div>
          )}
          {data.indicators.averageEnergyPerCompany && (
            <div className="mb-4">
              <AverageEnergyPerCompanyTable data={data.indicators.averageEnergyPerCompany} />
            </div>
          )}
          {data.indicators.top5Emitters && (
            <div className="mb-4">
              <TopEmittersChart data={data.indicators.top5Emitters} />
            </div>
          )}
        </div>
      )}
    </main>
  );
}
