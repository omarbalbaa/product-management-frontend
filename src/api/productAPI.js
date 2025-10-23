import axios from "axios";
const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: "include"
});

export const getProducts = async (search = "", page = 1, limit = 8) => {
  try {
    const res = await api.get("", {
      params: {
        route: "product",
        search: search || undefined,
        page,
        limit
      }
    });

    return {
      products: res.data.products || [],
      total: res.data.total || 0,
      page: res.data.page || page,
      limit: res.data.limit || limit
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { products: [], total: 0, page: 1, limit: 8 }; 
  }
};

export const addProduct = async (formData) => {
  try {
    const response = await api.post('?route=product', formData, {
      headers: { 
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};
