
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { SlidersHorizontal } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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

interface MobileFiltersProps {
  activeCategory: string;
  availabilityFilters: AvailabilityFilters;
  priceRange: PriceRange;
  selectedFiltersCount: number;
  mobileFiltersOpen: boolean;
  setMobileFiltersOpen: (open: boolean) => void;
  onCategoryChange: (category: string) => void;
  onAvailabilityChange: (filters: AvailabilityFilters) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onClearFilters: () => void;
}

export const MobileFilters = ({
  activeCategory,
  availabilityFilters,
  priceRange,
  selectedFiltersCount,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  onCategoryChange,
  onAvailabilityChange,
  onPriceRangeChange,
  onClearFilters
}: MobileFiltersProps) => {
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
    setMobileFiltersOpen(false);
  };

  return (
    <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden flex items-center">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filters
          {selectedFiltersCount > 0 && (
            <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {selectedFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4 space-y-6">
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
                  id="mobile-in-stock"
                  checked={availabilityFilters.inStock}
                  onCheckedChange={(checked) => 
                    onAvailabilityChange({
                      ...availabilityFilters,
                      inStock: !!checked
                    })
                  }
                />
                <label htmlFor="mobile-in-stock" className="ml-2 text-sm font-medium">
                  In Stock
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="mobile-new-arrivals"
                  checked={availabilityFilters.newArrivals}
                  onCheckedChange={(checked) => 
                    onAvailabilityChange({
                      ...availabilityFilters,
                      newArrivals: !!checked
                    })
                  }
                />
                <label htmlFor="mobile-new-arrivals" className="ml-2 text-sm font-medium">
                  New Arrivals
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="mobile-on-sale"
                  checked={availabilityFilters.onSale}
                  onCheckedChange={(checked) => 
                    onAvailabilityChange({
                      ...availabilityFilters,
                      onSale: !!checked
                    })
                  }
                />
                <label htmlFor="mobile-on-sale" className="ml-2 text-sm font-medium">
                  On Sale
                </label>
              </div>
              <div className="flex items-center">
                <Checkbox
                  id="mobile-featured"
                  checked={availabilityFilters.featured}
                  onCheckedChange={(checked) => 
                    onAvailabilityChange({
                      ...availabilityFilters,
                      featured: !!checked
                    })
                  }
                />
                <label htmlFor="mobile-featured" className="ml-2 text-sm font-medium">
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

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => {
              onClearFilters();
              setMobileFiltersOpen(false);
            }}
          >
            Clear All Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
