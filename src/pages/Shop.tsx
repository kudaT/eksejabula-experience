
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ShopFilters } from '@/components/shop/ShopFilters';
import { MobileFilters } from '@/components/shop/MobileFilters';
import { FilterBadges } from '@/components/shop/FilterBadges';
import { CategoryTabs } from '@/components/shop/CategoryTabs';
import { SortSelect } from '@/components/shop/SortSelect';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Product, AvailabilityFilters, PriceRange } from '@/components/shop/types';

const productData: Product[] = [
  {
    id: '1',
    name: 'Los Vega Red & Navy Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/8ea544dc-5868-4a67-a1c9-6cfbc17fad31.png',
    category: 'Jerseys',
    isNew: true,
    isFeatured: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
  {
    id: '2',
    name: 'Los Vega White & Gold Jersey',
    price: 599,
    imageUrl: '/lovable-uploads/855df925-681a-473e-92f1-8663321ad71e.png',
    category: 'Jerseys',
    isFeatured: true,
    isSoldOut: false,
    priceToBeUpdated: true,
  },
];

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortOption, setSortOption] = useState('newest');
  const [priceRange, setPriceRange] = useState<PriceRange>({ min: 0, max: 1000 });
  const [availabilityFilters, setAvailabilityFilters] = useState<AvailabilityFilters>({
    inStock: false,
    newArrivals: false,
    onSale: false,
    featured: false,
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(productData);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedFiltersCount, setSelectedFiltersCount] = useState(0);

  useEffect(() => {
    const category = queryParams.get('category') || 'all';
    setActiveCategory(category);
  }, [location.search]);

  useEffect(() => {
    let result = [...productData];
    
    if (activeCategory !== 'all') {
      result = result.filter(
        product => product.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }
    
    if (availabilityFilters.inStock) {
      result = result.filter(product => !product.isSoldOut);
    }
    
    if (availabilityFilters.newArrivals) {
      result = result.filter(product => product.isNew);
    }
    
    if (availabilityFilters.onSale) {
      result = result.filter(product => product.discount && product.discount > 0);
    }
    
    if (availabilityFilters.featured) {
      result = result.filter(product => product.isFeatured);
    }
    
    result = result.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    );
    
    switch(sortOption) {
      case 'price-low':
        result.sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * (a.discount / 100)) : a.price;
          const bPrice = b.discount ? b.price - (b.price * (b.discount / 100)) : b.price;
          return aPrice - bPrice;
        });
        break;
      case 'price-high':
        result.sort((a, b) => {
          const aPrice = a.discount ? a.price - (a.price * (a.discount / 100)) : a.price;
          const bPrice = b.discount ? b.price - (b.price * (b.discount / 100)) : b.price;
          return bPrice - aPrice;
        });
        break;
      case 'newest':
        result.sort((a, b) => (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1);
        break;
      case 'popular':
        result.sort((a, b) => (a.isFeatured === b.isFeatured) ? 0 : a.isFeatured ? -1 : 1);
        break;
      default:
        break;
    }
    
    setFilteredProducts(result);
    
    let count = 0;
    if (availabilityFilters.inStock) count++;
    if (availabilityFilters.newArrivals) count++;
    if (availabilityFilters.onSale) count++;
    if (availabilityFilters.featured) count++;
    if (priceRange.min > 0 || priceRange.max < 1000) count++;
    
    setSelectedFiltersCount(count);
  }, [activeCategory, sortOption, priceRange, availabilityFilters]);

  const clearAllFilters = () => {
    setActiveCategory('all');
    setPriceRange({ min: 0, max: 1000 });
    setAvailabilityFilters({
      inStock: false,
      newArrivals: false,
      onSale: false,
      featured: false,
    });
    setSortOption('newest');
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'beanies' || category === 'art') {
      toast.info(
        `${category === 'beanies' ? 'Beanies' : 'Art & Posters'} coming soon!`,
        {
          description: "We're working on adding these products to our collection."
        }
      );
    }
  };

  return (
    <div className="pt-8 pb-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl md:text-5xl font-display font-medium mb-4">
            Shop Collection
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our unique collection of jerseys, beanies, and art prints, all designed with creativity and quality in mind.
          </p>
        </div>

        <CategoryTabs 
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block animate-slide-in-right">
            <ShopFilters 
              activeCategory={activeCategory}
              availabilityFilters={availabilityFilters}
              priceRange={priceRange}
              onCategoryChange={handleCategoryChange}
              onAvailabilityChange={setAvailabilityFilters}
              onPriceRangeChange={setPriceRange}
              onClearFilters={clearAllFilters}
            />
          </div>

          <div className="md:col-span-3 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <p className="text-muted-foreground hidden sm:block mr-2">
                  {filteredProducts.length} products
                </p>
                {selectedFiltersCount > 0 && (
                  <Badge variant="outline" className="ml-2">
                    {selectedFiltersCount} filter{selectedFiltersCount > 1 ? 's' : ''} applied
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <MobileFilters 
                  activeCategory={activeCategory}
                  availabilityFilters={availabilityFilters}
                  priceRange={priceRange}
                  selectedFiltersCount={selectedFiltersCount}
                  mobileFiltersOpen={mobileFiltersOpen}
                  setMobileFiltersOpen={setMobileFiltersOpen}
                  onCategoryChange={handleCategoryChange}
                  onAvailabilityChange={setAvailabilityFilters}
                  onPriceRangeChange={setPriceRange}
                  onClearFilters={clearAllFilters}
                />

                <SortSelect 
                  sortOption={sortOption}
                  onSortChange={setSortOption}
                />
              </div>
            </div>

            {selectedFiltersCount > 0 && (
              <FilterBadges 
                priceRange={priceRange}
                availabilityFilters={availabilityFilters}
                onPriceRangeChange={setPriceRange}
                onAvailabilityChange={setAvailabilityFilters}
                onClearFilters={clearAllFilters}
              />
            )}

            <ProductGrid 
              products={filteredProducts}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
              onClearFilters={clearAllFilters}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
