/**
 * Typescript interface defining the structure of indicators data.
 */
export interface Indicators {
  totalCO2PerYear: Record<number, number>;
  averageEnergyPerCompany: Record<string, number>;
  top5Emitters: { companyName: string; emissions: number }[];
}
