import React, { useState } from 'react';
import { addProduct } from '../app/api';
import { useNavigate } from 'react-router-dom';

const AddProduct: React.FC = () => {
  const [product, setProduct] = useState({
    name: '',
    price: 0,
    description: '',
    title: '',
    category: '',
    image: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, category: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedProduct = await addProduct(product);
      if (addedProduct) {

        navigate('/');
      }
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };
  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            name="title"
            value={product.title}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            name="category"
            value={product.category}
            onChange={handleCategoryChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          >
            <option value="Electronics">Electronics</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Women's Clothing">Women's Clothing</option>
            <option value="Men's Clothing">Men's Clothing</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            className="mt-1 p-2 border rounded-lg w-full focus:outline-none focus:border-blue-400"
          />
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Add Product
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
