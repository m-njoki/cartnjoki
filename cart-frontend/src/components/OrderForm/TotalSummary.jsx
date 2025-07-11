export default function TotalSummary({ cart, products }) {
  const calculateTotal = () => {
    let total = 0;
    for (const item of cart) {
      const product = products.find(p => p._id === item.productId);
      if (product) total += product.price * item.quantity;
    }
    return total;
  };

  const total = calculateTotal();
  const tax = Math.round(total * 0.08);
  const grandTotal = total + tax;

  return (
    <div className="mb-8 text-right space-y-1">
      <p>Total: <span className="font-semibold">KES {total}</span></p>
      <p>Tax (8%): <span className="font-semibold">KES {tax}</span></p>
      <p className="text-lg font-bold">Grand Total: KES {grandTotal}</p>
    </div>
  );
}
