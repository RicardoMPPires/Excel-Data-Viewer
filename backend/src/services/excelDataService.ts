import * as XLSX from 'xlsx';
import { ExcelTableDTO } from '../schemas/excelTable.schema';
import { mapRowsToDTOs } from '../mappers/excelTable.mapper';

/**
 * Receives an Excel file and parses the data
 * @param fileBuffer the input file
 * @returns a DTO with the parsed data
 */
export const parseExcel = (fileBuffer: Buffer): ExcelTableDTO[] => {
  const workbook = XLSX.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];

  const rawData: any[] = XLSX.utils.sheet_to_json(worksheet);

  // Map raw rows to validated DTOs
  return mapRowsToDTOs(rawData);
};
