import { useState, useEffect } from 'react';
import api from '../api';

export default function ProductForm({ product, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    inStock: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (product) {
        await api.patch(`/products/${product._id}`, formData);
      } else {
        await api.post('/products', formData);
      }
      onSuccess(); // refresh list or close modal
    } catch (err) {
      console.error(err);
      alert('❌ Failed to save product');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white border p-4 rounded shadow max-w-md">
      <h2 className="text-lg font-semibold text-primary">
        {product ? '✏️ Edit Product' : '➕ Add Product'}
      </h2>

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="inStock"
        type="number"
        placeholder="Stock Quantity"
        value={formData.inStock}
        onChange={handleChange}
        className="w-full border p-2 rounded"
        required
      />

      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="text-gray-500">Cancel</button>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-violet-700">
          {product ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
}
