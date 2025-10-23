import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}`;

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true
});

export const login = async (credentials) => {
  try {
    const response = await api.post('?route=user', credentials);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.delete('?route=user');
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get('?route=user');
    return response.data;
  } catch (error) {
    console.error('Auth check error:', error);
    return { loggedIn: false, user: null };
  }
};