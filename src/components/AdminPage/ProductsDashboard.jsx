import React, { useState, useEffect } from 'react';
import ProductCard from '../ProductsPage/ProductCard';
import { getProducts } from '../../api/productAPI';

function ProductsDashboard() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const productsPerPage = 8;

  const loadProducts = async (page) => {
    setLoading(true);
    try {
      const data = await getProducts("", page, productsPerPage);
      if (data.products) {
        setProducts(data.products);
        setTotalProducts(data.total);
      }
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts(currentPage);
  }, [currentPage]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center py-4">Loading...</p>;
  if (error) return <div className="text-black bg-white border border-black p-4 mb-4 text-center">{error}</div>;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Existing Products</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Products List */}
        <div className="md:col-span-3 p-4">
          <h3 className="font-semibold mb-4">Products List</h3>
          <ul className="space-y-2">
            {products.map((product) => (
              <li 
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="p-2 hover:bg-black hover:text-white cursor-pointer transition-colors border-b"
              >
                {product.name} - {product.category}
              </li>
            ))}
          </ul>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-4 pt-4">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-black disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer hover:bg-black hover:text-white transition-colors"
              >
                Previous
              </button>
              
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 border cursor-pointer border-black transition-colors
                    ${currentPage === index + 1 
                      ? 'bg-black text-white' 
                      : 'hover:bg-black hover:text-white'
                    }`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border cursor-pointer border-black disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black hover:text-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Product Details Card */}
        <div className="md:col-span-1 p-4">
          {selectedProduct ? (
            <div className="w-full">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ProductCard product={selectedProduct} />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsDashboard;