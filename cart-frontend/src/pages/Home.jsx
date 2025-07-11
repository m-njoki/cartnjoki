import ProductList from '../components/ProductList';
import OrderForm from '../components/OrderForm';

export default function Home() {
  return (
    <div>
      <h1>Cart Home</h1>
      <ProductList />
      <OrderForm />
    </div>
  );
}
