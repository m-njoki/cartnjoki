import React from 'react';

const ProductList = ({ products, onAddToCart }) => {
  return (
    <div className="bg-white min-h-screen px-6 py-12">
      <h2 className="text-3xl font-bold text-charcoal mb-8 text-center">Our Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map(product => (
          <div key={product._id} className="bg-white border shadow-sm rounded-lg p-4 transition hover:shadow-md">
            <img
              src={product.imageUrl || "https://via.placeholder.com/150"}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-4"
            />
            <h3 className="text-xl font-semibold text-charcoal">{product.name}</h3>
            <p className="text-darkgray mt-1 mb-2">{product.description}</p>
            <p className="text-lg font-bold text-electric">KES {product.price}</p>
            <button
              onClick={() => onAddToCart(product)}
              className="mt-4 w-full bg-electric text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
