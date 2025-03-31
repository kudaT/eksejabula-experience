
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Demo data for the cart items
const demoCartItems = [
  {
    id: '1',
    name: 'Los Vega Home Jersey',
    price: 599,
    quantity: 1,
    image: '/lovable-uploads/5543d787-c616-440f-8393-d7b31f0aa342.png',
    variant: 'Size: M',
  },
  {
    id: '2',
    name: 'Tokyo #99 Jersey',
    price: 649,
    quantity: 1,
    image: '/lovable-uploads/cfc48a55-376c-47fc-8dac-9146c37c0f57.png',
    variant: 'Size: L',
  },
];

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  variant?: string;
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
}

const CartItem = ({ 
  id, 
  name, 
  price, 
  quantity, 
  image, 
  variant, 
  onUpdateQuantity,
  onRemoveItem
}: CartItemProps) => {
  return (
    <div className="flex py-4 border-b last:border-b-0">
      <div className="h-20 w-20 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
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
            
            <div className="mt-2 flex items-center border rounded-md w-fit">
              <button 
                className="px-2 py-1 hover:bg-secondary transition-colors"
                onClick={() => onUpdateQuantity(id, Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="px-2 py-1 text-xs font-medium min-w-[24px] text-center">{quantity}</span>
              <button 
                className="px-2 py-1 hover:bg-secondary transition-colors"
                onClick={() => onUpdateQuantity(id, Math.min(10, quantity + 1))}
                disabled={quantity >= 10}
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">R{price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">Total: R{(price * quantity).toFixed(2)}</p>
            <button 
              className="mt-2 text-red-500 hover:text-red-700 transition-colors p-1 rounded-full hover:bg-red-100"
              onClick={() => onRemoveItem(id)}
              aria-label="Remove item"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartDropdown = ({ className }: { className?: string }) => {
  const [items, setItems] = useState(demoCartItems);
  const isEmpty = items.length === 0;
  
  // Calculate totals
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  
  // Handling item quantity updates
  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Handling item removal
  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };
  
  // Clear all items
  const handleClearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <div className={cn("px-4 py-3", className)}>
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="font-medium">Your Cart ({itemCount})</h3>
        {!isEmpty && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 px-2 text-muted-foreground hover:text-foreground"
            onClick={handleClearCart}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="my-3 max-h-[320px] overflow-y-auto pr-2 scrollbar-thin">
        {isEmpty ? (
          <div className="py-8 text-center">
            <div className="bg-muted/50 rounded-full w-16 h-16 flex items-center justify-center mx-auto">
              <ShoppingCart className="h-8 w-8 text-muted-foreground" />
            </div>
            <p className="mt-4 text-sm font-medium">Your cart is empty</p>
            <p className="mt-1 text-xs text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            <Button asChild className="mt-4" size="sm">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <>
            {items.map(item => (
              <CartItem 
                key={item.id} 
                {...item} 
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            ))}
            
            {items.length > 0 && (
              <div className="mt-2 pt-2 text-xs text-muted-foreground flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Free shipping on orders over R1000
              </div>
            )}
          </>
        )}
      </div>

      {!isEmpty && (
        <>
          <div className="border-t pt-3 pb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm">Subtotal</span>
              <span className="font-medium">R{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>Shipping</span>
              <span className="text-sm">{subtotal >= 1000 ? 'Free' : 'R75.00'}</span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm font-bold border-t border-dashed pt-2 mt-2">
              <span>Total</span>
              <span>R{(subtotal >= 1000 ? subtotal : subtotal + 75).toFixed(2)}</span>
            </div>
            <div className="grid gap-2">
              <Button asChild className="w-full">
                <Link to="/checkout">Checkout</Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
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
