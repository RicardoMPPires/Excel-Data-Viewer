import { ExcelTableDTO } from '../schemas/excelTable.schema';

export interface Indicators {
  totalCO2PerYear: Record<number, number>;
  averageEnergyPerCompany: Record<string, number>;
  top5Emitters: { companyName: string; emissions: number }[];
}

/**
 * Processes the data to compute various indicators:
 * 1. Total CO₂ emissions per year.
 * 2. Average energy consumption per company.
 * 3. Top 5 companies with highest carbon emissions.
 * @param data The parsed Excel data
 * @returns The computed indicators
 */
export const computeIndicators = (data: ExcelTableDTO[]): Indicators => {
  const totalCO2PerYear: Record<number, number> = {};
  const energySum: Record<string, { total: number; count: number }> = {};
  const emissionsPerCompany: Record<string, number> = {};

  for (const row of data) {
    // 1. Total CO₂ per year
    totalCO2PerYear[row.year] = (totalCO2PerYear[row.year] || 0) + row.carbonEmissions;

    // 2. Energy consumption per company (for averaging)
    if (!energySum[row.companyName]) {
      energySum[row.companyName] = { total: 0, count: 0 };
    }
    energySum[row.companyName].total += row.energyConsumption;
    energySum[row.companyName].count++;

    // 3. Emissions per company
    emissionsPerCompany[row.companyName] =
      (emissionsPerCompany[row.companyName] || 0) + row.carbonEmissions;
  }

  // Compute averages
  const averageEnergyPerCompany: Record<string, number> = {};
  for (const company in energySum) {
    const { total, count } = energySum[company];
    averageEnergyPerCompany[company] = total / count;
  }

  // Find top 5 emitters
  const top5Emitters = Object.entries(emissionsPerCompany)
    .map(([companyName, emissions]) => ({ companyName, emissions }))
    .sort((a, b) => b.emissions - a.emissions)
    .slice(0, 5);

  return { totalCO2PerYear, averageEnergyPerCompany, top5Emitters };
};
