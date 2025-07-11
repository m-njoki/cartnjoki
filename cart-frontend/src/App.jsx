/*import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import OrderForm from './components/OrderForm';
import PaymentForm from './components/PaymentForm';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar />

      <main className="flex-grow">
        {loading ? (
          <div className="text-center py-20 text-purple-600 text-xl font-semibold">
            Loading products...
          </div>
        ) : (
          <ProductList products={products} />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
*/



import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import OrderForm from './components/OrderForm/OrderForm';
import PaymentForm from './components/PaymentForm';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);


  // Function to handle increasing product quantity in the cart
  const handleIncreaseQty = (productId) => {
  setCart((prev) =>
    prev.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
    )
  );
};

  // Function to handle adding products to the cart
  const handleAddToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) {
        return prev.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  useEffect(() => {
    console.log('🛒 Cart:', cart);
  }, [cart]);

  // Function to handle removing products from the cart
  const handleRemoveFromCart = (productId) => {
  const confirmRemoval = window.confirm("Remove this product from cart?");

  if (!confirmRemoval) return;

  setCart((prev) =>
    prev
      .map((item) =>
        item._id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  // Function to handle clearing the cart
  const handleClearCart = () => {
  const confirmClear = window.confirm("Are you sure you want to clear the cart?");
  if (confirmClear) setCart([]);
};


  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Navbar cartCount={cart.reduce((total, item) => total + item.quantity, 0)} />


      <main className="flex-grow">
        <Routes>
          // Home route showing product list
          <Route
            path="/"
            element={
              loading ? (
                <div className="text-center py-20 text-purple-600 text-xl font-semibold">
                  Loading products...
                </div>
              ) : (
                <ProductList products={products} onAddToCart={handleAddToCart}/>
              )
            }
          />

          //Cart route showing cart items
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onRemoveFromCart={handleRemoveFromCart}
                onIncreaseQty={handleIncreaseQty}
                onClearCart={handleClearCart}
              />
            }
          />


          // Order form route for placing orders
          <Route
            path="/orders"
            element={
            <OrderForm
            cart={cart}
            clearCart={() => setCart([])}
            />}
          />

          // Payment form route for processing payments
          <Route path="/payments" element={<PaymentForm />} />
          <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
