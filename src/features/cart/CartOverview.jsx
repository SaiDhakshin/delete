import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartQty, getTotalCartPrice } from './cartSlice';
import { formatCurrency } from '../../utils/helpers';

function CartOverview() {
  // const totalCartQty = useSelector((state) => state.cart.cart.reduce((sum,item) => sum + item.quantity),0);
  const totalCartQty = useSelector(getTotalCartQty);
  const totalCartPrice = useSelector(getTotalCartPrice);

  if(!totalCartQty) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalCartQty} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
