import { Link, Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">🛠 Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-accent">Dashboard</Link>
          <Link to="/admin/products" className="block hover:text-accent">Products</Link>
          <Link to="/admin/orders" className="block hover:text-accent">Orders</Link>
          <Link to="/admin/payments" className="block hover:text-accent">Payments</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
