import { Link } from 'react-router-dom';

export default function Navbar({ cartCount }) {
  return (
    <nav className="bg-charcoal text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl text-electric">TechFlow</h1>

      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <Link to="/" className="hover:text-electric">HOME</Link>
        </li>
        <li className="relative">
          <Link to="/cart" className="hover:text-electric">
            CART
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link to="/orders" className="hover:text-electric">ORDERS</Link>
        </li>
        <li>
          <Link to="/payments" className="hover:text-electric">PAYMENTS</Link>
        </li>
      </ul>
    </nav>
  );
}
