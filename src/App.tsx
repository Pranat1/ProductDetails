import { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import ProductList from './ProductList';
import DataManager from './DataManager';
import { Product } from './types';
import { productService } from './productService';
const saverData = true;

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = () => {
    const loadedProducts = productService.getAllProducts();
    setProducts(loadedProducts);
  };

  const handleAddProduct = (product: Product) => {
    try {
      // Add to local storage
      const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
      const updatedProducts = [...existingProducts, product];
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      
      // Update state
      setProducts(updatedProducts);
      
      // Show success message (optional)
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  // Load products from localStorage on initial mount
  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (saverData)
      {loadProducts()}
    else if(storedProducts){
      setProducts(JSON.parse(storedProducts))
    }
  })

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Product Image Manager
        </h1>
        
        <DataManager onDataImported={loadProducts} />
        
        <ProductForm onAddProduct={handleAddProduct} />
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Stored Products:</h2>
          <pre className="bg-white p-4 rounded-lg shadow overflow-auto max-h-40 text-sm">
            {JSON.stringify(products, null, 2)}
          </pre>
        </div>
        
        <ProductList 
          products={products} 
        />
      </div>
    </div>
  );
};

export default App;