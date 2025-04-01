
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  discount?: number;
  className?: string;
  showPrice?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  isNew = false,
  isFeatured = false,
  isSoldOut = false,
  discount = 0,
  className,
  showPrice = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const discountedPrice = discount > 0 ? price - (price * (discount / 100)) : null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to cart logic will go here
    console.log(`Quick add product: ${id}`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    // Add to wishlist logic will go here
    console.log(`Add to wishlist: ${id}`);
  };

  return (
    <Link 
      to={`/product/${id}`}
      className={cn(
        "group block relative rounded-xl overflow-hidden transition-all duration-300 animate-scale-in",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="aspect-[3/4] relative overflow-hidden bg-secondary">
        <div className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isImageLoaded ? "opacity-0" : "opacity-100"
        )}>
          <div className="absolute inset-0 animate-pulse bg-muted" />
        </div>
        <img
          src={imageUrl}
          alt={name}
          className={cn(
            "h-full w-full object-cover transition-all duration-500",
            isHovered ? "scale-105" : "scale-100",
            isImageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Product Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isNew && (
            <span className="px-2 py-1 bg-accent text-white text-xs font-medium rounded">
              New
            </span>
          )}
          {isFeatured && (
            <span className="px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
              Featured
            </span>
          )}
          {discount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
              {discount}% Off
            </span>
          )}
          {isSoldOut && (
            <span className="px-2 py-1 bg-gray-800 text-white text-xs font-medium rounded">
              Sold Out
            </span>
          )}
        </div>
        
        {/* Quick Actions */}
        <div className={cn(
          "absolute right-3 flex flex-col gap-2 transition-all duration-300",
          isHovered ? "opacity-100 top-3" : "opacity-0 top-6"
        )}>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-9 w-9 bg-white hover:bg-white text-foreground shadow-md"
            onClick={handleWishlist}
          >
            <Heart className="h-4 w-4" />
            <span className="sr-only">Add to wishlist</span>
          </Button>
        </div>
        
        {/* Quick Add to Cart */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 py-3 px-3 bg-background/90 backdrop-blur-sm transition-all duration-300 flex justify-between items-center",
          isHovered ? "translate-y-0" : "translate-y-full"
        )}>
          <div>
            <p className="text-sm font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{category}</p>
          </div>
          <Button
            size="icon"
            className="rounded-full h-8 w-8 bg-foreground text-background hover:bg-foreground/90"
            onClick={handleQuickAdd}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="sr-only">Quick add</span>
          </Button>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="pt-3 pb-2 flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm text-muted-foreground">{category}</p>
            <h3 className="font-medium text-base mt-1">{name}</h3>
          </div>
          {showPrice && (
            <div className="text-right">
              {discountedPrice ? (
                <>
                  <span className="text-red-500 font-medium">R{discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-muted-foreground line-through text-sm">R{price.toFixed(2)}</span>
                </>
              ) : (
                <span className="font-medium">R{price.toFixed(2)}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
