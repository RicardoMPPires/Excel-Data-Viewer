import { Router } from 'express';
import { processExcel } from '../controllers/excelController'; // renamed function

const router = Router();

// Endpoint for processing Excel files
router.post('/excel', processExcel);

export default router;
