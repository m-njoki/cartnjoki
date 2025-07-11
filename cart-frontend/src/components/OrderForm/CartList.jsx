import CartItem from './CartItem';

export default function CartList({ products, cart, onQtyChange, onRemove }) {
  return (
    <div className="space-y-4 mb-8">
      <h3 className="font-semibold text-lg">Select Products:</h3>
      {products.map(p => {
        const cartItem = cart.find(item => item.productId === p._id);
        return (
          <CartItem
            key={p._id}
            product={p}
            quantity={cartItem?.quantity || ''}
            onQtyChange={onQtyChange}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}
