import { z } from 'zod';

/**
 * Zod schema for validating each row of the Excel table.
 */
export const ExcelRowSchema = z.object({
  companyName: z.string().min(1, 'Name is required'),
  year: z.number().int().nonnegative('Year must be non-negative'),
  sector: z.string().min(1, 'Sector is required'),
  energyConsumption: z.number().nonnegative('Energy consumption must be non-negative'),
  carbonEmissions: z.number().nonnegative('Carbon emissions must be non-negative'),
});

// Infer the TypeScript type automatically
export type ExcelTableDTO = z.infer<typeof ExcelRowSchema>;
