import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { createApiUrl } from '../utils/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log('Starting to fetch products...');
    const apiUrl = createApiUrl('/api/products');
    console.log('Full API URL:', apiUrl);
    
    try {
      console.log('Making request to:', apiUrl);
      const response = await fetch(apiUrl);
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (response.ok) {
        const result = await response.json();
        console.log('Full response data:', result);
        console.log('Result success:', result.success);
        console.log('Result data:', result.data);
        console.log('Data length:', result.data?.length);
        
        if (result.success && result.data) {
          console.log('Setting products:', result.data.length, 'products');
          setProducts(result.data);
        } else {
          console.error('Invalid response structure:', result);
          setProducts([]);
        }
      } else {
        const errorText = await response.text();
        console.error('HTTP error:', response.status, errorText);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', error instanceof Error ? error.message : String(error));
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Our Products</h1>
        
        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;