import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    api.get('/payments')
      .then(res => setPayments(res.data))
      .catch(err => console.error('Error loading payments:', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-primary">💳 Payment History</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Payment ID</th>
            <th className="py-2 px-4">Order</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Time</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {payments.map(payment => (
            <tr key={payment._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{payment._id.slice(-6)}</td>
              <td className="py-2 px-4">{payment.orderId.slice(-6)}</td>
              <td className="py-2 px-4 text-green-600 font-semibold">Ksh {payment.amount}</td>
              <td className="py-2 px-4">{new Date(payment.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
