
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui-custom/ProductCard';
import { Clock } from 'lucide-react';

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

interface ProductGridProps {
  products: Product[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onClearFilters: () => void;
}

export const ProductGrid = ({
  products,
  activeCategory,
  onCategoryChange,
  onClearFilters
}: ProductGridProps) => {
  if (activeCategory === 'beanies' || activeCategory === 'art') {
    return (
      <div className="text-center py-16 bg-secondary/50 rounded-xl">
        <Clock className="w-12 h-12 mb-4 mx-auto text-muted-foreground" />
        <h3 className="text-xl font-medium mb-2">Coming Soon</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          We're working hard to bring you amazing {activeCategory === 'beanies' ? 'beanies' : 'art & posters'}.
          Check back soon!
        </p>
        <Button onClick={() => onCategoryChange('jerseys')}>
          View Available Jerseys
        </Button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16 bg-secondary/50 rounded-xl">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p className="text-muted-foreground mb-6">
          Try adjusting your filters to find what you're looking for.
        </p>
        <Button onClick={onClearFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} {...product} showPrice={true} />
      ))}
    </div>
  );
};
