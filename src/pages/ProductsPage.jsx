import { useEffect, useState, useRef, useCallback } from "react";
import { getProducts } from "../api/productAPI";
import ProductCard from "../components/ProductsPage/ProductCard";
import UserNav from "../components/ProductsPage/UserNav";
import { Link } from "react-router-dom";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();
  const initialLoadDone = useRef(false);
  
  const lastProductRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await getProducts(search, page);
      if (response.products && response.products.length > 0) {
        setProducts(prevProducts => 
          // If it's page 1, replace products, otherwise append
          page === 1 ? response.products : [...prevProducts, ...response.products]
        );
        setHasMore(response.products.length === response.limit);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle search changes
  useEffect(() => {
    if (!initialLoadDone.current) {
      initialLoadDone.current = true;
      return;
    }
    setProducts([]);
    setPage(1);
    setHasMore(true);
  }, [search]);

  useEffect(() => {
    loadProducts();
  }, [page, search]);

  return (
    <div>
      <UserNav search={search} setSearch={setSearch} />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6">
          {products.map((product, index) => (
            <div key={product.id} ref={index === products.length - 1 ? lastProductRef : null}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {loading && (
          <div className="text-center py-4">
            Loading more products...
          </div>
        )}
        <div className="text-sm text-end m-4">
          <Link to="/admin">Go to Admin Panel</Link>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
