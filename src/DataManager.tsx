import { useRef } from 'react';
import { productService } from './productService';

type DataManagerProps = {
  onDataImported: () => void;
};

const DataManager = ({ onDataImported }: DataManagerProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await productService.importData(file);
        onDataImported();
      } catch (error) {
        console.error('Failed to import data:', error);
        alert('Failed to import data. Please check the file format.');
      }
    }
  };

  return (
    <div className="flex gap-4 justify-center mb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImport}
        accept=".json"
        className="hidden"
        aria-label="Import JSON file"
      />
      
      <button
        onClick={() => fileInputRef.current?.click()}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
        aria-label="Import data"
      >
        Import Data
      </button>
      
      <button
        onClick={() => productService.exportData()}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
        aria-label="Export data"
      >
        Export Data
      </button>
    </div>
  );
};

export default DataManager;