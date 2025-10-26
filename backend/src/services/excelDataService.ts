import { ExcelTableDTO } from '../schemas/excelTable.schema';

/**
 * Processes the data to compute various indicators.
 * @param data The array of ExcelTableDTO data to process.
 * @returns The computed indicators including total CO2 per year, average energy consumption per company, and top 5 emitters.
 */
export const computeIndicators = (data: ExcelTableDTO[]) => {
  const totalCO2PerYear: Record<number, number> = {};
  const energyByCompany: Record<string, number[]> = {};

  data.forEach((row) => {
    totalCO2PerYear[row.year] = (totalCO2PerYear[row.year] || 0) + row.carbonEmissions;
    energyByCompany[row.companyName] = energyByCompany[row.companyName] || [];
    energyByCompany[row.companyName].push(row.energyConsumption);
  });

  const averageEnergyPerCompany = Object.fromEntries(
    Object.entries(energyByCompany).map(([company, values]) => [
      company,
      values.reduce((a, b) => a + b, 0) / values.length,
    ]),
  );

  const top5Emitters = Object.entries(
    data.reduce(
      (acc, row) => {
        acc[row.companyName] = (acc[row.companyName] || 0) + row.carbonEmissions;
        return acc;
      },
      {} as Record<string, number>,
    ),
  )
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name]) => name);

  return { totalCO2PerYear, averageEnergyPerCompany, top5Emitters };
};
