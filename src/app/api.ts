import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'http://localhost:8080/api/v1/products';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  title: string;
  category: string;
  image: string;
}

interface NewProduct {
  name: string;
  price: number;
  description: string;
  title: string;
  category: string;
  image: string;
}

// Fetch all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const response: AxiosResponse<Product[]> = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

// Fetch all categories
export const getCategories = async (): Promise<string[]> => {
  try {
    const response: AxiosResponse<string[]> = await axios.get(`${BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};

// Add a new product
export const addProduct = async (newProduct: NewProduct): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.post(BASE_URL, newProduct);
    return response.data;
  } catch (error) {
    console.error('Error adding product:', error);
    return null;
  }
};

// Fetch a single product by ID
export const getProduct = async (productId: number): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.get(`${BASE_URL}/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
};

// Update a product
export const updateProduct = async (productId: number, updatedProduct: Product): Promise<Product | null> => {
  try {
    const response: AxiosResponse<Product> = await axios.put(`${BASE_URL}/${productId}`, updatedProduct);
    console.log('Update Product Response:', response.data); // Add this log
    return response.data;
  } catch (error) {
    console.error('Error updating product:', error);
    return null;
  }
};


// Delete a product
export const deleteProduct = async (productId: number): Promise<boolean> => {
  try {
    await axios.delete(`${BASE_URL}/${productId}`);
    return true;
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
};
