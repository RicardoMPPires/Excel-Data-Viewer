import { API_BASE_URL, EXCEL_UPLOAD_ENDPOINT } from '@/constants/api';
import { ExcelUploadResponse } from '@/interfaces/response/excelUploadResponse';

/**
 * Uploads an Excel file to the backend API and returns the parsed response.
 * @param file The Excel file to upload
 * @returns The parsed response from the backend
 */
export const uploadExcel = async (file: File): Promise<ExcelUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${API_BASE_URL}/${EXCEL_UPLOAD_ENDPOINT}`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Something went wrong');
  }

  return res.json();
};
