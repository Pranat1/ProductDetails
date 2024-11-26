import { Product } from './types';

type ProductListProps = {
  products: Product[];
};

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        No products added yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <div className="space-y-2">
              {product.sizes.map((size, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span className="text-gray-600">Size: {size.size}</span>
                  <span className="text-gray-600">Lot: {size.lotNumber}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;