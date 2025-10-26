import { ExcelUploadResponse } from '@/interfaces/response/excelUploadResponse';

export const uploadExcel = async (file: File): Promise<ExcelUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('http://localhost:8000/api/excel', {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Something went wrong');
  }

  return res.json();
};
