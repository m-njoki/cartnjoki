import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function OrderForm({ cart, clearCart }) {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);

  // New: Customer details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pickupStation, setPickupStation] = useState('');

  const [loading, setLoading] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');

  const calculateDeliveryFee = (station) => {
    if (!station) return 0;
    const lower = station.toLowerCase();
    if (lower.includes('nairobi')) return 150;
    if (lower.includes('mombasa')) return 250;
    if (lower.includes('thika')) return 180;
    if (lower.includes('nyeri')) return 200;
    if (lower.includes('meru')) return 220;
    return 250; // default
  };

  const estimateDeliveryDate = (station) => {
  const today = new Date();
  let startOffset = 2;
  let endOffset = 3;

  if (!station.toLowerCase().includes('nairobi')) {
    startOffset = 3;
    endOffset = 5;
  }

  const start = new Date(today);
  start.setDate(today.getDate() + startOffset);

  const end = new Date(today);
  end.setDate(today.getDate() + endOffset);

  const options = { day: 'numeric' };
  const startDay = start.toLocaleDateString('en-KE', options);
  const endDay = end.toLocaleDateString('en-KE', options);
  const month = end.toLocaleDateString('en-KE', { month: 'long' });

  return `${startDay}–${endDay} ${month}`;
};


  useEffect(() => {
    if (pickupStation) {
      setDeliveryFee(calculateDeliveryFee(pickupStation));
      setDeliveryDate(estimateDeliveryDate(pickupStation));
    }
  }, [pickupStation]);

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!cart.length) {
    return setMessage({ type: 'error', text: 'Cart is empty!' });
  }

  const order = {
    customerName: name,
    phone,
    address,
    pickupStation,
    deliveryFee,
    totalAmount: grandTotal,
    products: cart.map(item => ({
      productId: item._id,
      quantity: item.quantity,
    })),
  };

  setLoading(true);
  try {
    const res = await api.post('/orders', order);
    const { _id, totalAmount } = res.data;

    //Save order info before navigating
    localStorage.setItem('orderId', _id);
    localStorage.setItem('totalAmount', totalAmount);

    setMessage({ type: 'success', text: `Order placed! Total: KES ${totalAmount}` });
    clearCart();

    // Navigate to payment page after saving
    navigate('/payments');
  } catch (err) {
    setMessage({ type: 'error', text: err.response?.data?.error || 'Order failed' });
  } finally {
    setLoading(false);
  }
};


  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="mt-10 max-w-2xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Confirm Your Order</h2>

      {message && (
        <div className={`mb-4 text-sm p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Customer Info */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Jane Doe"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="e.g. 0712345678"
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Address + Pickup */}
        <div>
          <label className="block font-semibold mb-1">Delivery Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter delivery address"
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Pickup Station</label>
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
        </div>

        {/* Cart Summary */}
        <div className="border-t pt-4">
          <h3 className="font-bold text-lg mb-2">Delivery Summary</h3>
          <ul className="divide-y">
            {cart.map(item => (
              <li key={item._id} className="py-4 flex items-center gap-4">
                {item.imageUrl && (
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded object-cover border" />
                )}
                <div className="flex-1">
                  <p className="font-semibold">{item.name} × {item.quantity}</p>
                  <p className="text-sm text-gray-600">KES {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1 text-sm">
            <p>Subtotal: <strong>KES {cartTotal.toLocaleString()}</strong></p>
            <p>Delivery Fee: <strong>KES {deliveryFee.toLocaleString()}</strong></p>
            <p>Estimated Delivery: <strong>{deliveryDate}</strong></p>
            <p className="text-lg mt-2"> <strong>Total: KES {grandTotal.toLocaleString()}</strong></p>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded hover:bg-blue-700 transition"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
