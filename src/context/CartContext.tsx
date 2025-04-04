
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/components/shop/types';
import { toast } from '@/hooks/use-toast';

export interface CartProduct extends Omit<Product, 'category' | 'isNew' | 'isFeatured'> {
  quantity: number;
  variant?: string;
}

interface CartContextType {
  items: CartProduct[];
  itemCount: number;
  subtotal: number;
  addToCart: (product: CartProduct) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartProduct[]>([]);
  
  // Load cart from localStorage on initial mount
  useEffect(() => {
    const savedCart = localStorage.getItem('eksejabula-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
        localStorage.removeItem('eksejabula-cart');
      }
    }
  }, []);
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('eksejabula-cart', JSON.stringify(items));
    } else {
      localStorage.removeItem('eksejabula-cart');
    }
  }, [items]);
  
  // Calculate item count and subtotal
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Add item to cart or increment quantity if it already exists
  const addToCart = (product: CartProduct) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(item => item.id === product.id);
      
      if (existingItemIndex > -1) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += product.quantity || 1;
        toast({
          title: "Updated cart",
          description: `${product.name} quantity updated in your cart`,
        });
        return updatedItems;
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart`,
        });
        return [...currentItems, { ...product, quantity: product.quantity || 1 }];
      }
    });
  };
  
  // Update quantity of an item
  const updateQuantity = (id: string, quantity: number) => {
    setItems(currentItems => {
      return currentItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };
  
  // Remove an item from cart
  const removeFromCart = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} has been removed from your cart`,
        });
      }
      return currentItems.filter(item => item.id !== id);
    });
  };
  
  // Clear the entire cart
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      subtotal,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
