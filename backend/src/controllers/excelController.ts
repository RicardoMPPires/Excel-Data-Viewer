import { Request, Response } from 'express';
import { parseExcel } from '../services/excelDataService';
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
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       age:
 *                         type: number
 *       400:
 *         description: Invalid input or Excel file
 */
export const processExcel = (req: Request, res: Response) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const file = req.files.file as any;

  try {
    const data: ExcelTableDTO[] = parseExcel(file.data);
    return res.json({ message: 'File processed successfully', data });
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ error: error.message });
  }
};
