import { Router } from 'express';
import { processExcel } from '../controllers/excelController';

const router = Router();

// Endpoint for processing Excel files
/**
 * @swagger
 * /excel:
 *   post:
 *     summary: Upload an Excel file and process its contents
 *     description: >
 *       Accepts an Excel file, parses its contents, and computes analytics indicators
 *       such as total CO₂ emissions per year, average energy consumption per company,
 *       and the top 5 companies with the highest emissions.
 *     tags:
 *       - Excel Data
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
 *                 description: The Excel file to upload.
 *     responses:
 *       200:
 *         description: Successfully parsed and analyzed Excel data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: Parsed data extracted from the Excel file.
 *                   items:
 *                     type: object
 *                     properties:
 *                       companyName:
 *                         type: string
 *                       year:
 *                         type: integer
 *                       sector:
 *                         type: string
 *                       energyConsumption:
 *                         type: number
 *                       carbonEmissions:
 *                         type: number
 *                 indicators:
 *                   type: object
 *                   description: Computed analytics based on the parsed data.
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
 *         description: No file uploaded.
 *       500:
 *         description: Failed to parse or process Excel file.
 */

router.post('/excel', processExcel);

export default router;
