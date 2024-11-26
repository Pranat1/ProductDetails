import { Product } from './types';

type DataStorageProps = {
  products: Product[];
  onDataLoad: (products: Product[]) => void;
};

const DataStorage = ({ products, onDataLoad }: DataStorageProps) => {
  // Load data when component mounts
  const handleLoad = (event: React.FormEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    if (value) {
      try {
        const parsedData = JSON.parse(value);
        onDataLoad(parsedData);
      } catch (e) {
        console.error('Failed to parse stored data');
      }
    }
  };

  return (
    <input 
      type="hidden"
      id="product-storage"
      value={JSON.stringify(products)}
      onLoad={handleLoad}
      data-product-storage="true"
    />
  );
};

export default DataStorage;