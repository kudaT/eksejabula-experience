
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/ui-custom/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  discount?: number;
  priceToBeUpdated?: boolean;
}

// Updated product data to match the shop products
const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Los Vega Red & Navy Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/8ea544dc-5868-4a67-a1c9-6cfbc17fad31.png',
    category: 'Jerseys',
    isNew: true,
    isFeatured: true,
    priceToBeUpdated: true,
  },
  {
    id: '2',
    name: 'Los Vega White & Gold Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/d086ba96-413b-41a2-adf6-ffa9de4ada7d.png',
    category: 'Jerseys',
    isFeatured: true,
    priceToBeUpdated: true,
  },
];

interface FeaturedProductsProps {
  products?: Product[];
}

const FeaturedProducts = ({ products = featuredProducts }: FeaturedProductsProps) => {
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <section className="section-container bg-secondary/50">
      <div className="text-center mb-12">
        <h2 className="section-title">Featured Products</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our product categories.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="flex bg-background/50 rounded-full p-1.5 border">
          <button
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              activeCategory === 'all' 
                ? "bg-foreground text-background" 
                : "text-foreground hover:bg-secondary"
            )}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          <button
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              activeCategory === 'jerseys' 
                ? "bg-foreground text-background" 
                : "text-foreground hover:bg-secondary"
            )}
            onClick={() => setActiveCategory('jerseys')}
          >
            Jerseys
          </button>
          <button
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              activeCategory === 'beanies' 
                ? "bg-foreground text-background" 
                : "text-foreground hover:bg-secondary"
            )}
            onClick={() => setActiveCategory('beanies')}
          >
            Beanies
          </button>
          <button
            className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              activeCategory === 'art' 
                ? "bg-foreground text-background" 
                : "text-foreground hover:bg-secondary"
            )}
            onClick={() => setActiveCategory('art')}
          >
            Art
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeCategory === 'jerseys' || activeCategory === 'all' ? (
          products
            .filter(product => activeCategory === 'all' || product.category.toLowerCase() === activeCategory.toLowerCase())
            .map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                category={product.category}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
                showPrice={true}
                priceToBeUpdated={product.priceToBeUpdated}
              />
            ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <Clock className="w-12 h-12 mb-4 text-muted-foreground" />
            <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md">
              We're working hard to bring you amazing {activeCategory === 'beanies' ? 'beanies' : 'art & posters'}.
              Check back soon!
            </p>
          </div>
        )}
      </div>

      <div className="text-center mt-12">
        <Button asChild size="lg">
          <Link to="/shop" className="group">
            View All Products
            <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;
