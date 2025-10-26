export interface ExcelUploadResponse {
  message: string;
  data: any[];
  indicators?: {
    totalCO2PerYear?: Record<string, number>;
    averageEnergyPerCompany?: Record<string, number>;
    top5Emitters?: string[];
  };
}
