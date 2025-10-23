import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../api/productAPI";
import ProductForm from "../components/AdminPage/ProductForm";
import AdminNav from "../components/AdminPage/AdminNav";
import ProductsDashboard from "../components/AdminPage/ProductsDashboard";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div>
      <AdminNav setError={setError} />
      <div className="container p-5 space-y-8">
        <ProductForm onAdd={loadProducts} />
        <ProductsDashboard
          products={products}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}

export default AdminPage;
