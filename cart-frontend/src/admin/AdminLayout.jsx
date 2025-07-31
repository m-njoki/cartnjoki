import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/admin", label: "Dashboard" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/orders", label: "Orders" },
    { path: "/admin/payments", label: "Payments" },
  ];

  const handleLogout = () => {
    // Remove any stored auth tokens
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    // Redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6 shadow-lg flex flex-col">
        {/* Top Section */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
            Admin Panel
          </h2>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded transition duration-150 ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Logout Button */}
        <div className="mt-6">
          <button
            onClick={handleLogout}
            className="w-full bg-charcoal hover:bg-electric text-white py-2 rounded"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
