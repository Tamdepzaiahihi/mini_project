// EditProduct.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct, Product } from '../app/api';

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  const navigate = useNavigate()



  useEffect(() => {
    console.log(id); // Check if the ID is captured correctly
    fetchProduct();

  }, [id]);

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await getProduct(Number(id));
      setProduct(fetchedProduct);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!product) {
      return;
    }

    console.log('Updating Product:', product); // Log the product being updated

    try {
      const updatedProduct = await updateProduct(product.id, product);
      console.log('Updated Product Result:', updatedProduct); // Log the result of the update

      if (updatedProduct) {
        console.log('Product Updated Successfully');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  const handleCancel = () => {
    navigate('/');
  };



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100 p-6 rounded-lg max-w-md mx-auto shadow-md">
      <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
      <form className="space-y-4" onSubmit={handleUpdate}>
        <div className="flex flex-col">
          <label htmlFor="title" className="text-sm font-medium mb-1">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-400"
            value={product.title}
            onChange={(e) => setProduct({ ...product, title: e.target.value })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="price" className="text-sm font-medium mb-1">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-400"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium mb-1">Description:</label>
          <textarea
            id="description"
            name="description"
            className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-400"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="text-sm font-medium mb-1">Category:</label>
          <select
            id="category"
            name="category"
            className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-400"
            value={product.category}
            onChange={(e) => setProduct({ ...product, category: e.target.value })}
          >
            <option value="electronics">Electronics</option>
            <option value="Jewelry">Jewelry</option>
            <option value="Women's Clothing">Women's Clothing</option>
            <option value="Men's Clothing">Men's Clothing</option>
          </select>

        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-sm font-medium mb-1">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            className="py-2 px-3 border rounded-lg focus:outline-none focus:border-blue-400"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
        </div>

        <div className="flex justify-between">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
            Save Changes
          </button>
          <button type="button" onClick={handleCancel} className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

};

export default EditProduct;
