import { useEffect, useState } from 'react';
import api from '../api';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get('/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error('Error loading orders:', err));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6 text-primary">🧾 All Orders</h1>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-sm text-gray-700">
          <tr>
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4">Total</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Created</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {orders.map(order => (
            <tr key={order._id} className="border-t hover:bg-gray-50">
              <td className="py-2 px-4">{order._id.slice(-6)}</td>
              <td className="py-2 px-4 text-accent font-bold">Ksh {order.totalAmount}</td>
              <td className="py-2 px-4">
                <span className={`px-2 py-1 rounded text-xs font-medium 
                  ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800'
                    : order.status === 'delivered' ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'}
                `}>
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4">{new Date(order.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
