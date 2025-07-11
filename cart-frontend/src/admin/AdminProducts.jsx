import { useEffect, useState } from 'react';
import api from '../api';
import ProductForm from './ProductForm';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const loadProducts = () => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to load products:', err));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAddNew = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await api.delete(`/products/${id}`);
      loadProducts();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-primary">📦 All Products</h1>
        <button onClick={handleAddNew} className="bg-accent text-white px-4 py-2 rounded">
          ➕ New Product
        </button>
      </div>

      {showForm && (
        <ProductForm
          product={editingProduct}
          onSuccess={() => {
            setShowForm(false);
            loadProducts();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {products.map(product => (
          <div key={product._id} className="bg-white p-4 rounded-lg shadow border">
            <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex justify-between text-sm">
              <span className="text-accent font-bold">Ksh {product.price}</span>
              <span className="text-gray-500">Stock: {product.inStock}</span>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1 text-xs bg-yellow-500 text-white rounded"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 text-xs bg-red-600 text-white rounded"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
