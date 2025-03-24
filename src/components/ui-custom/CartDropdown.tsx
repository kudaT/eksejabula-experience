
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, X } from 'lucide-react';

// Demo data for the cart items
const demoCartItems = [
  {
    id: '1',
    name: 'Los Vega Jersey - Blue',
    price: 599,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1577280927879-b2f0b15c5409',
    variant: 'Size: M',
  },
  {
    id: '2',
    name: 'Premium Beanie - Black',
    price: 249,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
    variant: 'Size: One Size',
  },
];

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
}

const CartItem = ({ id, name, price, quantity, image, variant }: CartItemProps) => {
  return (
    <div className="flex py-3 border-b last:border-b-0">
      <div className="h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="ml-4 flex-1">
        <div className="flex justify-between">
          <div>
            <h4 className="text-sm font-medium">{name}</h4>
            {variant && (
              <p className="text-xs text-muted-foreground mt-0.5">{variant}</p>
            )}
            <div className="mt-1 flex items-center">
              <span className="text-xs text-muted-foreground">Qty: {quantity}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">R{price.toFixed(2)}</p>
            <button className="mt-1 text-sm text-red-500 hover:text-red-700 transition-colors">
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDropdown = () => {
  const items = demoCartItems;
  const isEmpty = items.length === 0;
  
  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="px-4 py-3">
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-medium">Your Cart ({itemCount})</h3>
        {!isEmpty && (
          <Button variant="ghost" size="sm" className="h-8 px-2 text-muted-foreground">
            Clear All
          </Button>
        )}
      </div>

      <div className="my-3 max-h-[320px] overflow-y-auto pr-2">
        {isEmpty ? (
          <div className="py-8 text-center">
            <ShoppingCart className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
            <p className="mt-3 text-sm text-muted-foreground">Your cart is empty</p>
          </div>
        ) : (
          items.map(item => (
            <CartItem key={item.id} {...item} />
          ))
        )}
      </div>

      {!isEmpty && (
        <>
          <div className="border-t pt-3 pb-4">
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal</span>
              <span className="font-medium">R{subtotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-4">
              Shipping and taxes calculated at checkout
            </p>
            <div className="grid gap-2">
              <Button asChild>
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/cart">View Cart</Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartDropdown;
