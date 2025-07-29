import { useNavigate } from "react-router-dom";

export default function CartPage({ cart, onRemoveFromCart, onIncreaseQty, onClearCart }) {
  const navigate = useNavigate();

  const handleOrderNow = () => {
    navigate("/orders"); // Make sure this route exists in your router
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">My Cart</h2>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.map(item => (
            <li key={item._id} className="border p-4 rounded flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img
                  src={item.imageUrl || "https://via.placeholder.com/60"}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p>KES {item.price} × {item.quantity} = <strong>KES {(item.price * item.quantity).toLocaleString()}</strong></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onRemoveFromCart(item._id)}
                  className="bg-red-100 px-2 py-1 rounded text-red-600 text-sm"
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => onIncreaseQty(item._id)}
                  className="bg-green-100 px-2 py-1 rounded text-green-600 text-sm"
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="mt-8 border-t pt-4 text-right">
          <h3 className="text-lg font-semibold mb-2">
            Total: KES{" "}
            {cart
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toLocaleString()}
          </h3>
          <p className="text-sm text-gray-500 italic mt-1">
            *Delivery fee not included yet.
          </p>

          <button
            onClick={onClearCart}
            className="mr-4 py-2 px-4 text-sm font-bold text-red-600 border border-red-300 rounded hover:bg-red-100"
          >
            Clear Cart
          </button>

          <button
            onClick={handleOrderNow}
            className="bg-electric hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Order Now
          </button>
        </div>
      )}
    </div>
  );
}
