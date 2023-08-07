import React, { useState, useEffect } from 'react';
import { getProducts, deleteProduct } from '../app/api';
import { Link, useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  title: string;
  category: string;
  image: string;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const fetchedProducts = await getProducts();
    setProducts(fetchedProducts);
  };

  const handleEdit = (productId: number) => {
    // Implement your edit functionality here or navigate to the edit page
    console.log(`Editing product with ID: ${productId}`);
  };

  const handleDelete = async (productId: number) => {
    const isDeleted = await deleteProduct(productId);
    if (isDeleted) {
      fetchProducts();
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Images</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.title}</td>
                <td className="px-4 py-2">
                  <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded" />
                </td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">{product.category}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">
                  <div className="flex">
                    <Link
                      to={`/edit/${product.id}`}
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
