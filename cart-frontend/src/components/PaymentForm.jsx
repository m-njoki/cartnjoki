import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from "../api";

export default function PaymentForm() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [paying, setPaying] = useState(false);
  const [message, setMessage] = useState(null);

  const [orderId, setOrderId] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const storedOrderId = localStorage.getItem('orderId');
    const storedAmount = localStorage.getItem('totalAmount');

    if (storedOrderId && storedAmount) {
      setOrderId(storedOrderId);
      setTotalAmount(parseFloat(storedAmount));
    } else {
      setMessage({ type: 'error', text: 'Missing order details. Please place an order first.' });
    }
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!orderId || !totalAmount || !paymentMethod) {
      return setMessage({ type: 'error', text: 'Missing payment details.' });
    }

    setPaying(true);
    setMessage(null);

    try {
      const res = await api.post(`${import.meta.env.VITE_API_BASE_URL}/payments`, {
        orderId,
        amount: totalAmount,
        paymentMethod, // Ensure correct value is used
      });

      console.log("Payment successful:", res.data);

      setMessage({ type: 'success', text: 'Payment recorded successfully!' });

      // Clean up localStorage and state
      localStorage.removeItem('orderId');
      localStorage.removeItem('totalAmount');

      setOrderId(null);
      setTotalAmount(0);
      setPaymentMethod('');

      // Navigate to a valid route after payment
      setTimeout(() => navigate('/'), 2000);
    } catch (error) {
      console.error("Payment failed:", error);
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to process payment.',
      });
    } finally {
      setPaying(false);
    }
  };

  return (
    <div className="mt-10 max-w-xl mx-auto px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Payment</h2>

      {message && (
        <div className={`mb-4 text-sm p-3 rounded ${
          message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handlePayment} className="space-y-6">
        <div>
          <label className="block font-semibold mb-1">Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded p-2"
            required
          >
            <option value="mpesa">M-PESA</option>
            <option value="cash">Cash on Delivery</option>
          </select>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-bold mb-1 text-lg">Amount to Pay</h3>
          <p className="text-lg">KES {totalAmount.toLocaleString()}</p>
        </div>

        <button
          type="submit"
          disabled={paying}
          className="w-full bg-green-600 text-white font-medium py-3 rounded hover:bg-green-700 transition"
        >
          {paying ? 'Processing Payment...' : 'Pay Now'}
        </button>
      </form>
    </div>
  );
}