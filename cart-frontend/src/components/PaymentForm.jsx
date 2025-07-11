import { useEffect, useState } from 'react';
import api from '../api';

export default function PaymentForm() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState('');
  const [amount, setAmount] = useState('');
  const [statusMsg, setStatusMsg] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error loading orders:', err));
  }, []);

  const handleOrderSelect = (id) => {
    const order = orders.find(o => o._id === id);
    setSelectedOrder(id);
    setAmount(order?.totalAmount || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOrder || !amount) {
      return setStatusMsg({ type: 'error', text: 'Please select an order and enter amount.' });
    }

    setLoading(true);
    try {
      await api.post('/payments', {
        orderId: selectedOrder,
        amount: Number(amount)
      });
      setStatusMsg({ type: 'success', text: '✅ Payment processed successfully!' });
      setSelectedOrder('');
      setAmount('');
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: err.response?.data?.error || 'Payment failed'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-lg font-bold text-center mb-4">💳 Process Payment</h2>

      {statusMsg && (
        <div
          className={`mb-4 p-2 rounded text-sm ${
            statusMsg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {statusMsg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          className="w-full border rounded p-2"
          value={selectedOrder}
          onChange={(e) => handleOrderSelect(e.target.value)}
        >
          <option value="">-- Select Order --</option>
          {orders.map((order) => (
            <option key={order._id} value={order._id}>
              Order #{order._id.slice(-5)} — Ksh {order.totalAmount}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}
