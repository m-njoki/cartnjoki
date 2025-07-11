import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function OrderForm({ cart, clearCart }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [address, setAddress] = useState('');
  const [pickupStation, setPickupStation] = useState('');

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cart.length) {
      return setMessage({ type: 'error', text: 'Cart is empty!' });
    }

    const order = {
      products: cart.map(item => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      address,
      pickupStation
    };

    setLoading(true);
    try {
      const res = await api.post('/orders', order);
      setMessage({ type: 'success', text: `Order placed! Total: KES ${res.data.totalAmount}` });

      // Clear the cart after successful order
      clearCart();

      navigate('/payments');

    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Order failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 max-w-xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">Confirm Your Order</h2>

      {message && (
        <div
          className={`mb-4 text-sm p-2 rounded ${
            message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <ul className="divide-y text-sm">
          {cart.map(item => (
            <li key={item._id} className="py-2 flex justify-between">
              <span>{item.name} × {item.quantity}</span>
              <span>KES {(item.price * item.quantity).toLocaleString()}</span>
            </li>
          ))}
        </ul>

        <div>
  <label className="block font-medium mb-1">📍 Delivery Address</label>
  <input
    type="text"
    value={address}
    onChange={(e) => setAddress(e.target.value)}
    placeholder="Enter delivery address"
    className="w-full border rounded p-2"
    required
  />
</div>

{/* Address Field */}
<input
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Enter delivery address"
  className="w-full border rounded p-2"
/>
  <label className="block font-medium mb-1">Pickup Station</label>
  <select
    value={pickupStation}
    onChange={(e) => setPickupStation(e.target.value)}
    className="w-full border rounded p-2"
    required
  >
    <option value="">-- Select pickup station --</option>
    <option value="Nairobi CBD">Nairobi CBD</option>
    <option value="Mombasa">Mombasa</option>
    <option value="Thika">Thika</option>
    <option value="Nyeri">Nyeri</option>
    <option value="Meru">Meru</option>
  </select>



        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
