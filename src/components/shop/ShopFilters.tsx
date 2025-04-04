
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

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

interface ShopFiltersProps {
  activeCategory: string;
  availabilityFilters: AvailabilityFilters;
  priceRange: PriceRange;
  onCategoryChange: (category: string) => void;
  onAvailabilityChange: (filters: AvailabilityFilters) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onClearFilters: () => void;
}

export const ShopFilters = ({
  activeCategory,
  availabilityFilters,
  priceRange,
  onCategoryChange,
  onAvailabilityChange,
  onPriceRangeChange,
  onClearFilters
}: ShopFiltersProps) => {
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div className="sticky top-24 space-y-6">
      <div>
        <h3 className="font-medium text-lg mb-3">Categories</h3>
        <div className="space-y-2">
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3",
              activeCategory === 'all' && "bg-secondary"
            )}
            onClick={() => handleCategoryChange('all')}
          >
            All Products
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3",
              activeCategory === 'jerseys' && "bg-secondary"
            )}
            onClick={() => handleCategoryChange('jerseys')}
          >
            Jerseys
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3",
              activeCategory === 'beanies' && "bg-secondary"
            )}
            onClick={() => handleCategoryChange('beanies')}
          >
            Beanies
          </Button>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start px-3",
              activeCategory === 'art' && "bg-secondary"
            )}
            onClick={() => handleCategoryChange('art')}
          >
            Art & Posters
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-lg mb-3">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <Checkbox
              id="in-stock"
              checked={availabilityFilters.inStock}
              onCheckedChange={(checked) => 
                onAvailabilityChange({
                  ...availabilityFilters,
                  inStock: !!checked
                })
              }
            />
            <label htmlFor="in-stock" className="ml-2 text-sm font-medium">
              In Stock
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="new-arrivals"
              checked={availabilityFilters.newArrivals}
              onCheckedChange={(checked) => 
                onAvailabilityChange({
                  ...availabilityFilters,
                  newArrivals: !!checked
                })
              }
            />
            <label htmlFor="new-arrivals" className="ml-2 text-sm font-medium">
              New Arrivals
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="on-sale"
              checked={availabilityFilters.onSale}
              onCheckedChange={(checked) => 
                onAvailabilityChange({
                  ...availabilityFilters,
                  onSale: !!checked
                })
              }
            />
            <label htmlFor="on-sale" className="ml-2 text-sm font-medium">
              On Sale
            </label>
          </div>
          <div className="flex items-center">
            <Checkbox
              id="featured"
              checked={availabilityFilters.featured}
              onCheckedChange={(checked) => 
                onAvailabilityChange({
                  ...availabilityFilters,
                  featured: !!checked
                })
              }
            />
            <label htmlFor="featured" className="ml-2 text-sm font-medium">
              Featured
            </label>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-lg mb-4">Price Range</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="w-20">
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => onPriceRangeChange({...priceRange, min: Number(e.target.value)})}
              className="w-full px-2 py-1 border rounded text-sm"
              min="0"
              max={priceRange.max}
            />
          </div>
          <span className="text-muted-foreground">to</span>
          <div className="w-20">
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => onPriceRangeChange({...priceRange, max: Number(e.target.value)})}
              className="w-full px-2 py-1 border rounded text-sm"
              min={priceRange.min}
              max="1000"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClearFilters}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );
};
