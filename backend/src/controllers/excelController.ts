import { Request, Response } from 'express';
import { parseExcel } from '../services/excelDataService';
import { computeIndicators } from '../services/dataAnalyticsService';
import { ExcelTableDTO } from '../schemas/excelTable.schema';

/**
 * @swagger
 * /excel:
 *   post:
 *     summary: Upload and process an Excel file
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Successfully processed Excel file
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       companyName:
 *                         type: string
 *                       year:
 *                         type: number
 *                       sector:
 *                         type: string
 *                       energyConsumption:
 *                         type: number
 *                       carbonEmissions:
 *                         type: number
 *                 indicators:
 *                   type: object
 *                   properties:
 *                     totalCO2PerYear:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                     averageEnergyPerCompany:
 *                       type: object
 *                       additionalProperties:
 *                         type: number
 *                     top5Emitters:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           companyName:
 *                             type: string
 *                           emissions:
 *                             type: number
 *       400:
 *         description: Invalid input or Excel file
 */
export const processExcel = (req: Request, res: Response) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.files.file as any;
  if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
    return res.status(400).json({ error: 'Invalid file type. Please upload an Excel file.' });
  }

  try {
    // 1️⃣ Parse Excel file
    const data: ExcelTableDTO[] = parseExcel(file.data);

    // 2️⃣ Compute indicators
    const indicators = computeIndicators(data);

    // 3️⃣ Return parsed data + computed indicators
    return res.json({
      message: 'File processed successfully',
      data,
      indicators,
    });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
