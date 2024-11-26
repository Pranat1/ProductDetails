import { useState } from 'react';
import { Product, SizeInfo } from './types';

type ProductFormProps = {
  onAddProduct: (product: Product) => void;
};

const ProductForm = ({ onAddProduct }: ProductFormProps) => {
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [sizes, setSizes] = useState<SizeInfo[]>([]);
  const [currentSize, setCurrentSize] = useState('');
  const [currentLot, setCurrentLot] = useState('');

  const handleAddSize = () => {
    if (!currentSize || !currentLot) return;
    
    setSizes([...sizes, { size: currentSize, lotNumber: currentLot }]);
    setCurrentSize('');
    setCurrentLot('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl || sizes.length === 0) return;

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      imageUrl,
      sizes,
    };

    onAddProduct(newProduct);
    setName('');
    setImageUrl('');
    setSizes([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Product name"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Image URL"
          />
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={currentSize}
            onChange={(e) => setCurrentSize(e.target.value)}
            placeholder="Size"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Size"
          />
          <input
            type="text"
            value={currentLot}
            onChange={(e) => setCurrentLot(e.target.value)}
            placeholder="Lot Number"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            aria-label="Lot number"
          />
          <button
            type="button"
            onClick={handleAddSize}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
            aria-label="Add size"
          >
            Add Size
          </button>
        </div>

        {sizes.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700">Added Sizes:</h3>
            <div className="mt-2 space-y-2">
              {sizes.map((size, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                  <span>Size: {size.size}</span>
                  <span>Lot: {size.lotNumber}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:ring-2 focus:ring-green-300"
          aria-label="Submit product"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;