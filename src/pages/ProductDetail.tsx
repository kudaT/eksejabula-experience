
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ChevronRight, Star, Heart, Share2, ShoppingCart, 
  Truck, RefreshCw, Shield, Minus, Plus, ChevronDown, 
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui-custom/ProductCard';

// Sample products data
const products = [
  {
    id: '1',
    name: 'Los Vega Home Jersey',
    description: 'The Los Vega Home Jersey combines comfort with unique design. Made from premium materials, this jersey features bold graphics and a modern fit that makes it perfect for both casual wear and showing your support for Los Vega.',
    price: 599,
    imageUrls: [
      'https://images.unsplash.com/photo-1577280927879-b2f0b15c5409',
      'https://images.unsplash.com/photo-1580087632545-b497034a0a74',
      'https://images.unsplash.com/photo-1541051595295-e0e3ad01db18',
    ],
    category: 'Jerseys',
    isNew: true,
    rating: 4.5,
    reviewCount: 24,
    inStock: true,
    sku: 'LVJ-001-BLU',
    material: '100% Polyester',
    features: [
      'Breathable fabric',
      'Quick-dry technology',
      'Athletic fit',
      'Machine washable',
    ],
    customizable: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Blue', 'Red', 'Black'],
  },
  {
    id: '2',
    name: 'Los Vega Away Jersey',
    description: 'The Away Jersey by Los Vega features a stunning design that stands out on any occasion. Made with premium fabrics for comfort and durability.',
    price: 599,
    imageUrls: [
      'https://images.unsplash.com/photo-1580087632545-b497034a0a74',
      'https://images.unsplash.com/photo-1577280927879-b2f0b15c5409',
      'https://images.unsplash.com/photo-1541051595295-e0e3ad01db18',
    ],
    category: 'Jerseys',
    isFeatured: true,
    rating: 4.7,
    reviewCount: 18,
    inStock: true,
    sku: 'LVJ-002-RED',
    material: '100% Polyester',
    features: [
      'Breathable fabric',
      'Quick-dry technology',
      'Athletic fit',
      'Machine washable',
    ],
    customizable: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Red', 'Blue', 'White'],
  },
  {
    id: '4',
    name: 'Premium Beanie - Black',
    description: 'Stay warm in style with our Premium Beanie. Made from soft, high-quality materials, this beanie offers both comfort and a sleek look for any casual outfit.',
    price: 249,
    imageUrls: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531',
      'https://images.unsplash.com/photo-1578020190125-f4f7c26f4cff',
      'https://images.unsplash.com/photo-1611249021021-21220638532a',
    ],
    category: 'Beanies',
    rating: 4.8,
    reviewCount: 32,
    inStock: true,
    sku: 'PB-001-BLK',
    material: '60% Cotton, 40% Acrylic',
    features: [
      'Ribbed texture',
      'One size fits most',
      'Soft and comfortable',
      'Hand wash recommended',
    ],
    customizable: false,
    sizes: ['One Size'],
    colors: ['Black', 'Grey', 'Navy'],
  },
  {
    id: '7',
    name: 'Street Art Print',
    description: 'Add some urban flair to your space with our Street Art Print. This high-quality art piece features vibrant colors and unique designs that make a statement in any room.',
    price: 349,
    imageUrls: [
      'https://images.unsplash.com/photo-1561839561-b13bcfe95249',
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853',
      'https://images.unsplash.com/photo-1547891654-e66ed7ebb968',
    ],
    category: 'Art',
    discount: 15,
    rating: 4.6,
    reviewCount: 15,
    inStock: true,
    sku: 'AP-001-URB',
    material: 'Premium Art Paper',
    features: [
      'High-quality print',
      'Vibrant colors',
      'Multiple size options',
      'Frame not included',
    ],
    customizable: false,
    sizes: ['A4', 'A3', 'A2'],
    colors: [],
  },
];

// Related products
const relatedProducts = [
  {
    id: '3',
    name: 'Los Vega Third Kit',
    price: 599,
    discount: 10,
    imageUrl: 'https://images.unsplash.com/photo-1541051595295-e0e3ad01db18',
    category: 'Jerseys',
  },
  {
    id: '5',
    name: 'Premium Beanie - Grey',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1578020190125-f4f7c26f4cff',
    category: 'Beanies',
    isNew: true,
  },
  {
    id: '6',
    name: 'Premium Beanie - Red',
    price: 249,
    imageUrl: 'https://images.unsplash.com/photo-1611249021021-21220638532a',
    category: 'Beanies',
  },
  {
    id: '8',
    name: 'Abstract Gallery Poster',
    price: 299,
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853',
    category: 'Art',
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id) || products[0]; // Fallback to first product
  
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [customText, setCustomText] = useState('');
  const [customNumber, setCustomNumber] = useState('');
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  // Calculate price
  const basePrice = product.price;
  const discountPrice = product.discount 
    ? basePrice - (basePrice * (product.discount / 100)) 
    : null;
  const customizationFee = isCustomizing ? 150 : 0; // R150 for customization
  const totalPrice = (discountPrice || basePrice) + customizationFee;

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    setAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Adding to cart:', {
        product,
        quantity,
        selectedSize,
        selectedColor,
        customization: isCustomizing ? { text: customText, number: customNumber } : null,
        totalPrice: totalPrice * quantity
      });
      
      setAddingToCart(false);
      
      // You can add a toast notification here
    }, 800);
  };

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-muted-foreground animate-fade-in">
          <nav className="flex items-center">
            <Link to="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link to="/shop" className="hover:text-foreground transition-colors">
              Shop
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link 
              to={`/shop?category=${product.category.toLowerCase()}`} 
              className="hover:text-foreground transition-colors"
            >
              {product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4 animate-fade-in">
            <div className="aspect-square rounded-xl overflow-hidden bg-secondary">
              <img 
                src={product.imageUrls[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.imageUrls.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    "aspect-square rounded-md overflow-hidden border-2",
                    selectedImage === index ? "border-accent" : "border-transparent"
                  )}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col animate-slide-in-right">
            <div>
              {product.isNew && (
                <Badge variant="secondary" className="mb-2">
                  New
                </Badge>
              )}
              {product.discount && (
                <Badge variant="destructive" className="mb-2 ml-2">
                  {product.discount}% Off
                </Badge>
              )}
              <h1 className="text-3xl md:text-4xl font-display font-medium">{product.name}</h1>
              
              <div className="flex items-center mt-2 mb-4">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "h-4 w-4", 
                        i < Math.floor(product.rating) 
                          ? "text-amber-500 fill-amber-500" 
                          : i < product.rating 
                            ? "text-amber-500 fill-amber-500 opacity-50" 
                            : "text-muted-foreground"
                      )} 
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({product.reviewCount} reviews)
                  </span>
                </div>
                <Separator orientation="vertical" className="mx-4 h-5" />
                <span className="text-sm">
                  SKU: <span className="text-muted-foreground">{product.sku}</span>
                </span>
              </div>
              
              <div className="mb-6">
                <div className="flex items-center">
                  {discountPrice ? (
                    <>
                      <span className="text-3xl font-bold text-red-500">R{discountPrice.toFixed(2)}</span>
                      <span className="ml-2 text-lg line-through text-muted-foreground">R{basePrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="text-3xl font-bold">R{basePrice.toFixed(2)}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Includes tax. Shipping calculated at checkout.
                </p>
              </div>
              
              <p className="text-muted-foreground mb-6">
                {product.description}
              </p>
              
              <div className="space-y-6">
                {/* Size Selection */}
                {product.sizes.length > 0 && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label htmlFor="size">Size</Label>
                      <Link to="/size-guide" className="text-sm text-accent hover:underline">
                        Size Guide
                      </Link>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={cn(
                            "px-3 py-1 border rounded-md text-sm font-medium transition-colors",
                            selectedSize === size
                              ? "bg-foreground text-background border-foreground"
                              : "bg-background text-foreground border-input hover:bg-secondary"
                          )}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Color Selection */}
                {product.colors.length > 0 && (
                  <div>
                    <Label htmlFor="color" className="mb-2 block">Color</Label>
                    <Select
                      value={selectedColor}
                      onValueChange={setSelectedColor}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a color" />
                      </SelectTrigger>
                      <SelectContent>
                        {product.colors.map(color => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {/* Customization for Jerseys */}
                {product.customizable && (
                  <div className="bg-secondary/50 p-4 rounded-xl">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium">Customize Your Jersey</h3>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="customize"
                          checked={isCustomizing}
                          onChange={(e) => setIsCustomizing(e.target.checked)}
                          className="mr-2"
                        />
                        <label htmlFor="customize" className="text-sm">
                          Add Customization (+R150)
                        </label>
                      </div>
                    </div>
                    
                    {isCustomizing && (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="custom-text" className="text-sm mb-1 block">
                            Name/Text
                          </Label>
                          <Input
                            id="custom-text"
                            value={customText}
                            onChange={(e) => setCustomText(e.target.value)}
                            placeholder="Your name or text"
                            className="bg-background"
                            maxLength={15}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Max 15 characters
                          </p>
                        </div>
                        <div>
                          <Label htmlFor="custom-number" className="text-sm mb-1 block">
                            Number
                          </Label>
                          <Input
                            id="custom-number"
                            value={customNumber}
                            onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                            placeholder="Your number"
                            className="bg-background"
                            maxLength={2}
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Max 2 digits
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Quantity and Add to Cart */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center border rounded-md w-36">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground disabled:opacity-50"
                      disabled={quantity === 1}
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val) && val > 0) {
                          setQuantity(val);
                        }
                      }}
                      className="w-16 text-center border-0 focus:ring-0"
                      min="1"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  
                  <Button 
                    className="flex-1"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={addingToCart || !product.inStock}
                  >
                    {addingToCart ? (
                      <>
                        <span className="animate-spin mr-2">⟳</span>
                        Adding...
                      </>
                    ) : product.inStock ? (
                      <>
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add to Cart - R{(totalPrice * quantity).toFixed(2)}
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </Button>
                  
                  <Button variant="outline" size="icon" className="h-12 w-12">
                    <Heart className="h-5 w-5" />
                    <span className="sr-only">Add to Wishlist</span>
                  </Button>
                </div>
              </div>
              
              {/* Product Features */}
              <div className="mt-8 flex flex-col gap-4">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">On all orders over R500</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <RefreshCw className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30 day return policy</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Secure Checkout</p>
                    <p className="text-xs text-muted-foreground">Safe & protected checkout</p>
                  </div>
                </div>
              </div>
              
              {/* Share */}
              <div className="mt-8 flex items-center">
                <span className="text-sm mr-3">Share:</span>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <svg
                      className="h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16 animate-fade-in">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full max-w-md mx-auto grid grid-cols-3 mb-8">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specification">Specification</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="px-4 animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-medium mb-4">About the {product.name}</h2>
                <p className="text-muted-foreground mb-6">
                  {product.description}
                </p>
                <h3 className="text-xl font-medium mb-3">Features</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-6">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <h3 className="text-xl font-medium mb-3">Care Instructions</h3>
                <p className="text-muted-foreground">
                  {product.category === 'Jerseys' && (
                    "Machine wash cold with similar colors. Do not bleach. Tumble dry low. Do not iron decoration. Do not dry clean."
                  )}
                  {product.category === 'Beanies' && (
                    "Hand wash cold. Do not bleach. Lay flat to dry. Do not iron. Do not dry clean."
                  )}
                  {product.category === 'Art' && (
                    "Avoid direct sunlight to prevent fading. Clean with a soft, dry cloth. Frame under glass for protection."
                  )}
                </p>
              </div>
            </TabsContent>
            <TabsContent value="specification" className="px-4 animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-medium mb-6">Product Specifications</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                    <div className="font-medium">SKU</div>
                    <div className="text-muted-foreground">{product.sku}</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                    <div className="font-medium">Material</div>
                    <div className="text-muted-foreground">{product.material}</div>
                  </div>
                  {product.category === 'Jerseys' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Fit</div>
                        <div className="text-muted-foreground">Athletic</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Neck Type</div>
                        <div className="text-muted-foreground">Crew Neck</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Sleeve Type</div>
                        <div className="text-muted-foreground">Short Sleeve</div>
                      </div>
                    </>
                  )}
                  {product.category === 'Beanies' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Style</div>
                        <div className="text-muted-foreground">Cuffed</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Thickness</div>
                        <div className="text-muted-foreground">Medium Weight</div>
                      </div>
                    </>
                  )}
                  {product.category === 'Art' && (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Print Type</div>
                        <div className="text-muted-foreground">Giclee</div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                        <div className="font-medium">Paper Weight</div>
                        <div className="text-muted-foreground">250 gsm</div>
                      </div>
                    </>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                    <div className="font-medium">Available Sizes</div>
                    <div className="text-muted-foreground">{product.sizes.join(", ")}</div>
                  </div>
                  {product.colors.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                      <div className="font-medium">Available Colors</div>
                      <div className="text-muted-foreground">{product.colors.join(", ")}</div>
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-3 border-b">
                    <div className="font-medium">Customizable</div>
                    <div className="text-muted-foreground">{product.customizable ? "Yes" : "No"}</div>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="px-4 animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                  <div>
                    <h2 className="text-2xl font-medium">Customer Reviews</h2>
                    <div className="flex items-center mt-2">
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            className={cn(
                              "h-5 w-5", 
                              i < Math.floor(product.rating) 
                                ? "text-amber-500 fill-amber-500" 
                                : i < product.rating 
                                  ? "text-amber-500 fill-amber-500 opacity-50" 
                                  : "text-muted-foreground"
                            )} 
                          />
                        ))}
                      </div>
                      <p className="ml-2 text-sm text-muted-foreground">
                        Based on {product.reviewCount} reviews
                      </p>
                    </div>
                  </div>
                  <Button className="mt-4 sm:mt-0">Write a Review</Button>
                </div>
                
                {/* Sample Reviews - In a real app, these would be pulled from a database */}
                <div className="space-y-6">
                  <div className="bg-secondary/50 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Amazing quality!</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-4 w-4", 
                                  i < 5 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                                )} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            2 weeks ago
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        Sarah K.
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      I absolutely love this jersey! The material is breathable and the design is unique. I've gotten so many compliments when wearing it. Definitely worth the purchase!
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Great design, runs a bit large</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-4 w-4", 
                                  i < 4 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                                )} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            1 month ago
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        Michael T.
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      The design is amazing and I love the way it looks. My only complaint is that it runs a bit large, so consider sizing down. The customization option was a great touch!
                    </p>
                  </div>
                  
                  <div className="bg-secondary/50 p-6 rounded-xl">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium">Impressed with the quality</h3>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                className={cn(
                                  "h-4 w-4", 
                                  i < 5 ? "text-amber-500 fill-amber-500" : "text-muted-foreground"
                                )} 
                              />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-muted-foreground">
                            3 months ago
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        Jessica R.
                      </div>
                    </div>
                    <p className="text-muted-foreground">
                      I was skeptical about the quality given the unique design, but I'm really impressed. The material is thick but breathable, and the print quality is top-notch. Will definitely be purchasing more from this brand!
                    </p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">Load More Reviews</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto px-4 animate-fade-in">
          <h2 className="text-2xl font-medium mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How does the sizing run?</AccordionTrigger>
              <AccordionContent>
                Our {product.category.toLowerCase()} tend to run true to size with a regular fit. We recommend checking our size guide for detailed measurements. If you're between sizes, we suggest sizing up for a more comfortable fit.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What materials are used?</AccordionTrigger>
              <AccordionContent>
                This {product.category.toLowerCase().slice(0, -1)} is made from {product.material} which provides durability, comfort, and a premium feel. We source high-quality materials to ensure our products last and maintain their appearance wash after wash.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I care for this product?</AccordionTrigger>
              <AccordionContent>
                {product.category === 'Jerseys' && (
                  "We recommend machine washing cold with similar colors. Do not bleach. Tumble dry low. Do not iron decoration. Do not dry clean."
                )}
                {product.category === 'Beanies' && (
                  "For best results, hand wash cold. Do not bleach. Lay flat to dry. Do not iron. Do not dry clean."
                )}
                {product.category === 'Art' && (
                  "To preserve your print, avoid direct sunlight to prevent fading. Clean with a soft, dry cloth. We recommend framing under glass for protection."
                )}
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>What is your return policy?</AccordionTrigger>
              <AccordionContent>
                We offer a 30-day return policy on all unworn, unwashed items in their original condition with tags attached. Custom items cannot be returned unless there is a defect. Please note that the customer is responsible for return shipping costs.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>How long does shipping take?</AccordionTrigger>
              <AccordionContent>
                Standard shipping typically takes 3-5 business days within South Africa. International shipping times vary by location, typically 7-14 business days. Expedited shipping options are available at checkout.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        {/* Related Products */}
        <div className="mt-20 animate-fade-in">
          <h2 className="text-2xl font-medium mb-8 text-center">You Might Also Like</h2>
          <div className="product-grid">
            {relatedProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-20 animate-fade-in">
          <h2 className="text-2xl font-medium mb-2 text-center">Recently Viewed</h2>
          <p className="text-center text-muted-foreground mb-8">Your browsing history</p>
          <div className="product-grid">
            {relatedProducts.slice(0, 4).reverse().map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
