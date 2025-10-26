import { useState } from 'react';
import { uploadExcel } from '../services/excelServices';
import { ExcelUploadResponse } from '@/interfaces/response/excelUploadResponse';

interface UploadFormProps {
  onDataReceived: (data: ExcelUploadResponse) => void;
}

export const UploadForm: React.FC<UploadFormProps> = ({ onDataReceived }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noFile, setNoFile] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      return;
    }

    // const validExtensions = ['.xls', '.xlsx'];
    // if (file && !validExtensions.includes(file.name.slice(-4))) {
    //   setError('Invalid file type. Please upload an .xls or .xlsx file.');
    //   setNoFile(false);
    //   return;
    // }

    setLoading(true);
    setError(null);
    setNoFile(false); // Reset noFile state when a file is selected

    try {
      const data = await uploadExcel(file);
      onDataReceived(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-6 border border-green-600 rounded-xl max-w-md mx-auto mt-8 bg-white"
    >
      <input
        type="file"
        accept=".xls,.xlsx"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border-2 border-green-400 p-3 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <button
        type="submit"
        disabled={!file || loading}
        className="bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? 'Uploading...' : 'Upload Excel'}
      </button>
      {error && <p className="text-red-500 font-medium">{error}</p>}
      {noFile && <p className="text-red-500 font-medium">Please select a file to upload</p>}
    </form>
  );
};
