export default function CartItem({ product, quantity, onQtyChange, onRemove }) {
  return (
    <div className="flex items-center justify-between border p-2 rounded">
      <div>
        <p className="font-medium">{product.name}</p>
        <p className="text-sm text-gray-600">KES {product.price}</p>
      </div>
      <input
        type="number"
        min="0"
        value={quantity}
        onChange={e => onQtyChange(product._id, Number(e.target.value))}
        className="w-20 border p-1 rounded text-center"
      />
      {quantity > 0 && (
        <button onClick={() => onRemove(product._id)} className="text-red-500 text-sm ml-2">
          Remove
        </button>
      )}
    </div>
  );
}
