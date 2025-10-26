import { Request, Response } from 'express';
import { mapRowsToDTOs, parseExcelToRows } from '../mappers/excelTable.mapper';
import { ExcelTableDTO } from '../schemas/excelTable.schema';
import { computeIndicators } from '../services/dataAnalyticsService';

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
 *                     $ref: '#/components/schemas/ExcelTableDTO'
 *                 indicators:
 *                   type: object
 *                   properties:
 *                     totalCO2PerYear:
 *                       type: object
 *                     averageEnergyPerCompany:
 *                       type: object
 *                     top5Emitters:
 *                       type: array
 *                       items:
 *                         type: string
 *       400:
 *         description: Invalid input or Excel file
 */
export const processExcel = async (req: Request, res: Response) => {
  try {
    // ✅ Step 1: Validate file presence
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.file as any;

    // ✅ Step 2: Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      return res.status(400).json({
        error: 'Invalid file type. Please upload an Excel file.',
      });
    }

    // ✅ Step 3: Parse raw Excel buffer into rows
    const rawRows = parseExcelToRows(file.data);

    // ✅ Step 4: Map raw rows → validated DTOs
    const dtoData: ExcelTableDTO[] = mapRowsToDTOs(rawRows);

    // ✅ Step 5: Compute indicators (service layer)
    const indicators = computeIndicators(dtoData);

    // ✅ Step 6: Respond with data + insights
    return res.json({
      message: 'File processed successfully',
      data: dtoData,
      indicators,
    });
  } catch (error: any) {
    console.error('❌ Error processing Excel:', error);
    return res.status(400).json({
      error: error.message || 'Failed to process Excel file',
    });
  }
};
