
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface AvailabilityFilters {
  inStock: boolean;
  newArrivals: boolean;
  onSale: boolean;
  featured: boolean;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterBadgesProps {
  priceRange: PriceRange;
  availabilityFilters: AvailabilityFilters;
  onPriceRangeChange: (range: PriceRange) => void;
  onAvailabilityChange: (filters: AvailabilityFilters) => void;
  onClearFilters: () => void;
}

export const FilterBadges = ({
  priceRange,
  availabilityFilters,
  onPriceRangeChange,
  onAvailabilityChange,
  onClearFilters
}: FilterBadgesProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-6">
      {(priceRange.min > 0 || priceRange.max < 1000) && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Price: R{priceRange.min} - R{priceRange.max}
          <button 
            onClick={() => onPriceRangeChange({ min: 0, max: 1000 })}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {availabilityFilters.inStock && (
        <Badge variant="secondary" className="flex items-center gap-1">
          In Stock
          <button 
            onClick={() => onAvailabilityChange({...availabilityFilters, inStock: false})}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {availabilityFilters.newArrivals && (
        <Badge variant="secondary" className="flex items-center gap-1">
          New Arrivals
          <button 
            onClick={() => onAvailabilityChange({...availabilityFilters, newArrivals: false})}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {availabilityFilters.onSale && (
        <Badge variant="secondary" className="flex items-center gap-1">
          On Sale
          <button 
            onClick={() => onAvailabilityChange({...availabilityFilters, onSale: false})}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      {availabilityFilters.featured && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Featured
          <button 
            onClick={() => onAvailabilityChange({...availabilityFilters, featured: false})}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
      <Button 
        variant="ghost" 
        className="text-sm h-7 px-2"
        onClick={onClearFilters}
      >
        Clear All
      </Button>
    </div>
  );
};
