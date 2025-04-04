
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Product } from "@/components/shop/types";

interface ProductCardProps extends Product {
  showPrice?: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  imageUrl,
  category,
  isNew,
  discount,
  isSoldOut,
  showPrice = true,
  className
}: ProductCardProps) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent card navigation
    e.stopPropagation();
    
    addToCart({
      id,
      name,
      price,
      imageUrl,
      category,
      quantity: 1,
      variant: 'Size: M', // Default variant - in a real app, this would be selected by user
    });
  };
  
  const discountedPrice = discount ? price - (price * discount / 100) : price;

  return (
    <Card className={cn(
      "group overflow-hidden duration-300 transition bg-white hover:shadow-lg",
      className
    )}>
      <Link to={`/product/${id}`} className="block">
        <CardHeader className="p-0">
          <div className="relative aspect-square overflow-hidden">
            <img 
              src={imageUrl} 
              alt={name}
              className="object-cover w-full h-full group-hover:scale-105 transition duration-500 ease-in-out" 
            />
            
            {/* Product badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {isNew && (
                <Badge variant="default" className="bg-blue-500">New</Badge>
              )}
              {discount && (
                <Badge variant="default" className="bg-red-500">{discount}% OFF</Badge>
              )}
              {isSoldOut && (
                <Badge variant="outline" className="bg-gray-100 border-gray-200 text-gray-700">Sold Out</Badge>
              )}
            </div>

            {/* Quick actions */}
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                size="sm" 
                variant="secondary" 
                className="rounded-full h-9 w-9 p-0 mr-1"
                title="Add to wishlist"
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="secondary" 
                className="rounded-full h-9 w-9 p-0"
                title="Add to cart"
                onClick={handleAddToCart}
                disabled={isSoldOut}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <h3 className="font-medium text-sm line-clamp-1">{name}</h3>
          
          {showPrice && (
            <div className="mt-1">
              {discount ? (
                <div className="flex items-center">
                  <span className="font-bold text-primary">R{discountedPrice.toFixed(2)}</span>
                  <span className="text-gray-400 text-xs line-through ml-2">R{price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-bold text-primary">R{price.toFixed(2)}</span>
              )}
            </div>
          )}
          
          <div className="mt-2">
            <Button 
              size="sm" 
              className="w-full"
              disabled={isSoldOut}
              variant={isSoldOut ? "outline" : "default"}
              onClick={isSoldOut ? undefined : handleAddToCart}
            >
              {isSoldOut ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
