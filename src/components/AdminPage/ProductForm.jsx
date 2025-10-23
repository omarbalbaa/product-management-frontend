import { useState } from "react";
import { addProduct } from "../../api/productAPI";

function ProductForm({ onAdd }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImage(null);
    setPreview(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      if (image) formData.append("image", image);

      const response = await addProduct(formData);

      if (response.success) {
        resetForm();
        if (onAdd) onAdd();
      } else {
        setError(response.message || "Failed to add product");
      }
    } catch (err) {
      setError(err.message || "Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Add New Product</h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-4xl mx-auto space-y-6"
      >
        {error && (
          <div className="text-black bg-white border border-black p-4 mb-4 text-center">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-black focus:outline-none"
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-black focus:outline-none"
          />
          <input
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-black focus:outline-none"
          />
        </div>

        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-3 border border-black focus:outline-none min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            disabled={loading}
            className="w-full px-4 py-3 border border-black focus:outline-none"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-32 h-32 object-cover border border-black"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 px-4 transition-colors hover:bg-white hover:text-black hover:border hover:border-black cursor-pointer"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
